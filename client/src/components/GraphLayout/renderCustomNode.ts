import { ForceGraphProps } from 'react-force-graph-2d';

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

export default renderCustomNode;
