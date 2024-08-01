import ForceGraph2D from 'react-force-graph-2d';
import { useSelectedNode } from '../../store/atoms';
import renderCustomNode from './renderCustomNode';
import useGraphData from '../../api/useGraphData';

export default function GraphLayout() {
	const { setSelectedNode } = useSelectedNode();
	const graphData = useGraphData();

	console.log(graphData);

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
