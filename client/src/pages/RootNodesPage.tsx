import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BaseNode } from '../types';
import { Link } from 'react-router-dom';
import queryKeys from '../api/queryKeys';
import apiRoutes from '../api/routes';

export default function RootNodesPage() {
	const { data: nodes } = useQuery<BaseNode[]>({
		queryKey: queryKeys.rootNodes,
		queryFn: async () => {
			const res = await axios.get(apiRoutes.nodes);
			return res.data;
		},
	});

	if (!nodes) {
		return;
	}

	return (
		<>
			{nodes.map(node => (
				<div key={node.nodeId}>
					<Link to={`/nodes/${node.nodeId}`}>{node.nodeName}</Link>
					<ul>
						{node.relations.map(relation => (
							<li key={relation.relationId}>
								<Link to={`/nodes/${relation.relationId}`}>
									{relation.relationName}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</>
	);
}
