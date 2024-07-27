import neo4j, { Driver, Session } from 'neo4j-driver';

class Neo4jService {
	private static instance: Neo4jService;
	private driver: Driver;
	private session: Session;

	private constructor() {
		const uri = Bun.env.NEO4J_URI || "bolt://localhost:7687"; 
		const user = Bun.env.NEO4J_USER || "neo4j"; 
		const password = Bun.env.NEO4J_PASSWORD || ""; 

		this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
		this.session = this.driver.session();
	}

	public static getInstance(): Neo4jService {
		if (!Neo4jService.instance) {
			Neo4jService.instance = new Neo4jService();
		}
		return Neo4jService.instance;
	}

	public async getAllNodesWithRelations() {
		try {
			const result = await this.session.run(`
        MATCH (n)-[r]->(m)
        RETURN id(n) AS nodeId, n.name AS nodeName, id(m) AS relationId, m.name AS relationName
        LIMIT 10
      `);

			const nodesWithRelations: {
				nodeId: number;
				nodeName: string;
				relations: { relationId: number; relationName: string }[];
			}[] = [];

			result.records.forEach(record => {
				const nodeId = record.get('nodeId').toInt();
				const nodeName = record.get('nodeName');
				const relationId = record.get('relationId').toInt();
				const relationName = record.get('relationName');

				let node = nodesWithRelations.find(n => n.nodeId === nodeId);
				if (!node) {
					node = { nodeId, nodeName, relations: [] };
					nodesWithRelations.push(node);
				}

				node.relations.push({ relationId, relationName });
			});

			return nodesWithRelations;
		} catch (error) {
			console.error('Error running query:', error);
			throw error;
		}
	}

	public async getNodeWithRelations(nodeId: number) {
		try {
			const result = await this.session.run(
				`
				MATCH (n)
				WHERE id(n) = $nodeId
				OPTIONAL MATCH (n)-[r]->(m)
				OPTIONAL MATCH (n)<-[r2]-(p)
				RETURN id(n) AS nodeId, n.name AS nodeName, 
							 collect(DISTINCT {relationId: id(m), relationName: m.name}) AS forwardRelations, 
							 collect(DISTINCT {relationId: id(p), relationName: p.name}) AS backwardRelations
				`,
				{ nodeId }
			);

			if (result.records.length === 0) {
				return null;
			}

			const record = result.records[0];
			const nodeNameResult = record.get('nodeName');
			const forwardRelations = record
				.get('forwardRelations')
				.filter((rel: any) => rel.relationId !== null)
				.map((rel: any) => ({
					relationId: rel.relationId.toInt(),
					relationName: rel.relationName,
				}));
			const backwardRelations = record
				.get('backwardRelations')
				.filter((rel: any) => rel.relationId !== null)
				.map((rel: any) => ({
					relationId: rel.relationId.toInt(),
					relationName: rel.relationName,
				}));

			return {
				nodeId,
				nodeName: nodeNameResult,
				forwardRelations,
				backwardRelations,
			};
		} catch (error) {
			console.error('Error running query:', error);
			throw error;
		}
	}

	public async addNodeWithRelation(nodeName: string, existingNodeId: number) {
		try {
			const result = await this.session.run(
				`
				MATCH (existingNode:Item)
				WHERE id(existingNode) = $existingNodeId
				CREATE (newNode:Item {name: $nodeName})
				CREATE (existingNode)-[:RELATED_TO]->(newNode)
				RETURN id(newNode) AS newNodeId, newNode.name AS newNodeName
				`,
				{ nodeName, existingNodeId }
			);

			if (result.records.length === 0) {
				return null;
			}

			const record = result.records[0];
			const newNodeId = record.get('newNodeId').toInt();
			const newNodeName = record.get('newNodeName');

			return {
				newNodeId,
				newNodeName,
			};
		} catch (error) {
			console.error('Error adding node with relation:', error);
			throw error;
		}
	}

	public async close() {
		await this.session.close();
		await this.driver.close();
	}
}

export default Neo4jService;
