import { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphLayout() {
	const [graphData, setGraphData] = useState<{
		nodes: { id: string; name: string }[];
		links: { source: string; target: string }[];
	}>({ nodes: [], links: [] });

	useEffect(() => {
		// Fetch data from Neo4j and transform it
		const fetchData = async () => {
			setGraphData({
				nodes: [
					{ id: '1', name: 'Node 1' },
					{ id: '2', name: 'Node 2' },
					{ id: '3', name: 'Node 3' },
					{ id: '4', name: 'Node 4' },
					{ id: '5', name: 'Node 5' },
				],
				links: [
					{ source: '1', target: '2' },
					{ source: '1', target: '3' },
					{ source: '2', target: '4' },
					{ source: '3', target: '4' },
					{ source: '4', target: '5' },
				],
			});
		};

		fetchData();
	}, []);

	return <ForceGraph2D backgroundColor='#363636' width={815} height={690} graphData={graphData} />;
}
