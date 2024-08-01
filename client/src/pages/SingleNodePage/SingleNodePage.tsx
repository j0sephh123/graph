import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SingleNodeI } from '../../types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import queryKeys from '../../api/queryKeys';
import useDeleteNode from '../../api/useDeleteNode';
import { clientRoutes } from '../../api/routes';
import useCreateRelatedNode from '../../api/useCreateRelatedNode';
import useDeleteRelation from '../../api/useDeleteRelation';
import useAddRelation from '../../api/useAddRelation';

export default function SingleNodePage() {
	const navigate = useNavigate();
	const id = +useParams().id!;
	const inputRef = useRef<HTMLInputElement>(null);
	const existingNodeIdRef = useRef<HTMLInputElement>(null);

	const { data: singleNode, refetch } = useQuery<SingleNodeI>({
		queryKey: queryKeys.singleNode(id),
		queryFn: async () => {
			const res = await axios.get(`/api/nodes/${id}`);
			return res.data;
		},
	});

	const createRelatedNode = useCreateRelatedNode();
	const handleDeleteNode = useDeleteNode();
	const deleteRelation = useDeleteRelation();
	const addRelation = useAddRelation();

	if (!singleNode) {
		return null;
	}

	return (
		<div>
			<h3>name: {singleNode.nodeName}</h3>
			<button
				onClick={() =>
					handleDeleteNode(id).then(() => {
						navigate(clientRoutes.base);
					})
				}
			>
				Delete
			</button>
			<input ref={inputRef} />
			<button
				onClick={() =>
					createRelatedNode({
						existingNodeId: id,
						nodeName: inputRef.current!.value,
					}).then(() => {
						refetch();
					})
				}
			>
				Create new related node
			</button>
			<h3>backwardRelations</h3>
			{singleNode.backwardRelations.map(relation => (
				<li key={relation.relationId}>
					<Link to={`/nodes/${relation.relationId}`}>
						{relation.relationName}
					</Link>
					<button
						onClick={() => {
							deleteRelation({
								node1Id: relation.relationId,
								node2Id: id,
							}).then(() => {
								refetch();
							});
						}}
					>
						Break relation
					</button>
				</li>
			))}
			<h3>forwardRelations</h3>
			{singleNode.forwardRelations.map(relation => (
				<li key={relation.relationId}>
					<Link to={`/nodes/${relation.relationId}`}>
						{relation.relationName}
					</Link>
					<button
						onClick={() => {
							deleteRelation({
								node2Id: relation.relationId,
								node1Id: id,
							}).then(() => {
								refetch();
							});
						}}
					>
						Break relation
					</button>
				</li>
			))}
			<input ref={existingNodeIdRef} />
			<button
				onClick={() => {
					addRelation({
						node1Id: id,
						node2Id: +existingNodeIdRef.current!.value,
					}).then(() => {
						refetch();
					});
				}}
			>
				Create relation with existing node
			</button>
		</div>
	);
}
