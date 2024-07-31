export const apiRoutes = {
	nodes: '/api/nodes',
	graph: '/api/nodes/graph',
	singleNode: (nodeId: number) => `/api/nodes/${nodeId}`,
	relations: (node1Id: number, node2Id: number) =>
		`/api/nodes/relations/${node1Id}/${node2Id}`,
	addRelation: '/api/nodes/relations',
};

export const clientRoutes = {
	base: '/',
	singleNode: '/nodes/:id',
};

export default apiRoutes;
