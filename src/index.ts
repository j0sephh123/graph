import { Hono } from 'hono';
import Neo4jService from './Neo4jService';

const app = new Hono();

app.get('/api/nodes/graph', async c => {
	const neo4jService = Neo4jService.getInstance();
	try {
		const data = await neo4jService.getGraphData();
		return c.json(data);
	} catch (error) {
		return c.text('Error fetching data from Neo4j', 500);
	}
});

app.get('/api/nodes', async c => {
	const neo4jService = Neo4jService.getInstance();
	try {
		const data = await neo4jService.getAllNodesWithRelations();
		return c.json(data);
	} catch (error) {
		return c.text('Error fetching data from Neo4j', 500);
	}
});

app.get('/api/nodes/:id', async c => {
	const nodeId = parseInt(c.req.param('id'), 10);
	const neo4jService = Neo4jService.getInstance();
	try {
		const data = await neo4jService.getNodeWithRelations(nodeId);
		if (data) {
			return c.json(data);
		} else {
			return c.text('Node not found', 404);
		}
	} catch (error) {
		return c.text('Error fetching data from Neo4j', 500);
	}
});

// create a node
app.post('/api/nodes', async c => {
	const neo4jService = Neo4jService.getInstance();
	const { nodeName, existingNodeId } = await c.req.json();
	try {
		if (typeof existingNodeId === 'number') {
			const data = await neo4jService.addNodeWithRelation(
				nodeName,
				existingNodeId
			);
			return c.json(data);
		} else {
			const { exists, existingNodeId } = await neo4jService.nodeExists(
				nodeName
			);
			if (exists) {
				return c.json({ nodeExists: true, existingNodeId });
			}

			const data = await neo4jService.createNode(nodeName);
			return c.json(data);
		}
	} catch (error) {
		return c.text('Error creating node in Neo4j', 500);
	}
});

// delete a node
app.delete('/api/nodes/:id', async c => {
	const nodeId = parseInt(c.req.param('id'), 10);
	const neo4jService = Neo4jService.getInstance();
	try {
		const data = await neo4jService.deleteNode(nodeId);
		return c.json(data);
	} catch (error) {
		return c.text('Error deleting node from Neo4j', 500);
	}
});

// delete relation between 2 nodes
app.delete('/api/nodes/relations/:node1Id/:node2Id', async c => {
	const node1Id = parseInt(c.req.param('node1Id'), 10);
	const node2Id = parseInt(c.req.param('node2Id'), 10);
	const neo4jService = Neo4jService.getInstance();

	try {
		const data = await neo4jService.deleteRelation(node1Id, node2Id);
		return c.json(data);
	} catch (error) {
		return c.text('Error deleting relation from Neo4j', 500);
	}
});

// add relation between 2 nodes
app.post('/api/nodes/relations', async c => {
	const { node1Id, node2Id } = await c.req.json();
	const neo4jService = Neo4jService.getInstance();

	try {
		const data = await neo4jService.addRelation(node1Id, node2Id);
		return c.json(data);
	} catch (error) {
		return c.text('Error adding relation in Neo4j', 500);
	}
});

export default app;
