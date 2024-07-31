import { atom, useAtom } from 'jotai';
import { GraphNode } from '../types';

export const selectedNode = atom<GraphNode | null>(null);

export const useSelectedNode = () => {
	const [node, setNode] = useAtom(selectedNode);

	const setSelectedNode = (node: GraphNode | null) => {
		setNode(node);
	};

	return { node, setSelectedNode };
};
