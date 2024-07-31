import { TextInput } from '@mantine/core';
import { GraphNode } from '../../types';

type P = {
	node: GraphNode;
};

export default function TheAside({ node }: P) {
	/**
	 * on click of the name -> rename
	 * add a new node with relation
	 * connect to an existing node -> pick from canvas
	 * delete
	 */

	return (
		<>
			{node.name}
			<TextInput />
		</>
	);
}
