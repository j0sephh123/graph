export type BaseNode = {
	nodeId: number;
	nodeName: string;
	relations: Relation[];
};

export type SingleNodeI = Pick<BaseNode, 'nodeId' | 'nodeName'> & {
	forwardRelations: Relation[];
	backwardRelations: Relation[];
};

export type Relation = {
	relationId: number;
	relationName: string;
};

export type GraphNode = {
	id: number;
	name: string;
};
