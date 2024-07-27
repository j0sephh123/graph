import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BaseNode } from './types';
import { Link } from 'react-router-dom';

function App() {
	const { data: nodes } = useQuery<BaseNode[]>({
		queryKey: ['nodes'],
		queryFn: async () => {
			const res = await axios.get('/api/nodes');
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
					<h3>{node.nodeName}</h3>
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

export default App;
