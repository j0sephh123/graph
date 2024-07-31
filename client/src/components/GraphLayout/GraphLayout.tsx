import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ForceGraph2D from 'react-force-graph-2d';
import queryKeys from '../../api/queryKeys';
import apiRoutes from '../../api/routes';

export default function GraphLayout() {
	const { data: graphData } = useQuery<{
		nodes: { id: string; name: string }[];
		links: { source: string; target: string }[];
	}>({
		queryKey: queryKeys.graphData,
		queryFn: async () => {
			const response = await axios.get(apiRoutes.graph);

			return response.data;
		},
	});

	const renderCustomNode = (node, ctx, globalScale) => {
    const { id, name } = node;

    // Draw default circle node
    const radius = 5;
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(31, 120, 180, 0.92)';
    ctx.fill();

    // Draw text
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, node.x, node.y + radius + fontSize); 
  };

	return (
		<ForceGraph2D
			onNodeClick={node => {
				console.log(node);
			}}
			onNodeRightClick={node => {
				// do we have some context menu or?
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
			nodeCanvasObject={renderCustomNode}
			linkWidth={4}
			backgroundColor="#363636"
			width={815}
			height={690}
			graphData={graphData}
		/>
	);
}
