import queryKeys from '../../api/queryKeys';
import useCreateRelatedNode from '../../api/useCreateRelatedNode';
import useRefetchQueries from '../../api/useRefetchQueries';
import { GraphNode } from '../../types';
import InputWithIconButton from '../InputWithButton/InputWithIconButton';
import { useState } from 'react';

type P = {
	node: GraphNode;
};

export default function TheAside({ node }: P) {
	const refetchQueries = useRefetchQueries();
	const [newNodeInputValue, setNewNodeInputValue] = useState('');
	const createRelatedNode = useCreateRelatedNode();
	/**
	 * on click of the name -> rename
	 * add a new node with relation
	 * connect to an existing node -> pick from canvas
	 * delete
	 */

	const handleCreateNewRelatedNode = () => {
		createRelatedNode({
			existingNodeId: node.id,
			nodeName: newNodeInputValue,
		}).then(() => {
			setNewNodeInputValue('');
			refetchQueries([queryKeys.graphData]);
		});
	};

	console.log(node.id);

	return (
		<>
			{node.name}
			<InputWithIconButton
				setValue={setNewNodeInputValue}
				value={newNodeInputValue}
				onClick={handleCreateNewRelatedNode}
			/>
		</>
	);
}
