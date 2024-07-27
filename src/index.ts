import { Hono } from 'hono';
import Neo4jService from './Neo4jService';

const app = new Hono();

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

app.post('/api/nodes', async c => {
	const neo4jService = Neo4jService.getInstance();
	const { nodeName, existingNodeId } = await c.req.json();
	console.log({ nodeName, existingNodeId });

	try {
		const data = await neo4jService.addNodeWithRelation(
			nodeName,
			existingNodeId
		);
		return c.json(data);
	} catch (error) {
		return c.text('Error adding node with relation to Neo4j', 500);
	}
});

export default app;
