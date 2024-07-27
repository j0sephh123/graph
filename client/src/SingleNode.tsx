import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SingleNodeI } from './types';
import { Link, useParams } from 'react-router-dom';
import { useRef } from 'react';

interface NewNodeMutationVariables {
	existingNodeId: number;
	nodeName: string;
}

export default function SingleNode() {
	const id = +useParams().id!;
	const inputRef = useRef<HTMLInputElement>(null);

	const { data: singleNode } = useQuery<SingleNodeI>({
		queryKey: ['singleNode', id],
		queryFn: async () => {
			const res = await axios.get(`/api/nodes/${id}`);
			return res.data;
		},
	});

	const { mutate } = useMutation<unknown, unknown, NewNodeMutationVariables>({
		mutationFn: async variables => {
			const res = await axios.post(`/api/nodes`, {
				nodeName: variables.nodeName,
				existingNodeId: variables.existingNodeId,
			});
			return res.data;
		},
	});

	const handleNewNode = () => {
		mutate({
			existingNodeId: id,
			nodeName: inputRef.current!.value,
		});
	};

	if (!singleNode) {
		return null;
	}

	return (
		<div>
			<h3>name: {singleNode.nodeName}</h3>
			<input ref={inputRef} />
			<button onClick={handleNewNode}>Create new relation</button>
			<h3>backwardRelations</h3>
			{singleNode.backwardRelations.map(relation => (
				<li key={relation.relationId}>
					<Link to={`/nodes/${relation.relationId}`}>
						{relation.relationName}
					</Link>
				</li>
			))}
			<h3>forwardRelations</h3>
			{singleNode.forwardRelations.map(relation => (
				<li key={relation.relationId}>
					<Link to={`/nodes/${relation.relationId}`}>
						{relation.relationName}
					</Link>
				</li>
			))}
		</div>
	);
}
