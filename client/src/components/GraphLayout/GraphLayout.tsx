import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ForceGraph2D, { ForceGraphProps } from 'react-force-graph-2d';
import queryKeys from '../../api/queryKeys';
import apiRoutes from '../../api/routes';
import { GraphNode } from '../../types';
import { useSelectedNode } from '../../store/atoms';

export default function GraphLayout() {
	const { setSelectedNode } = useSelectedNode();
	const { data: graphData } = useQuery<{
		nodes: GraphNode[];
		links: { source: string; target: string }[];
	}>({
		queryKey: queryKeys.graphData,
		queryFn: async () => {
			const response = await axios.get(apiRoutes.graph);

			return response.data;
		},
	});

	const renderCustomNode: ForceGraphProps['nodeCanvasObject'] = (
		node,
		ctx,
		globalScale
	) => {
		const { name, x, y } = node;

		if (!x || !y) {
			return;
		}

		// Draw default circle node
		const radius = 5;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'rgba(31, 120, 180, 0.92)';
		ctx.fill();

		// Draw text
		const fontSize = 12 / globalScale;
		ctx.font = `${fontSize}px Sans-Serif`;
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(name, x, y + radius + fontSize);
	};

	return (
		<>
			<ForceGraph2D
				onNodeClick={node => {
					console.log(node);
				}}
				onNodeHover={node => {
					console.log('hover', node);
				}}
				onNodeDrag={node => {
					console.log('drag', node);
				}}
				onNodeDragEnd={node => {
					// maybe zoom on drag?
					console.log('drag end', node);
				}}
				onNodeRightClick={setSelectedNode}
				onBackgroundRightClick={() => {
					setSelectedNode(null);
				}}
				nodeCanvasObject={renderCustomNode}
				linkWidth={4}
				backgroundColor="#363636"
				width={815}
				height={690}
				graphData={graphData}
			/>
		</>
	);
}
