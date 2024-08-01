import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GraphNode } from '../types';
import queryKeys from './queryKeys';
import apiRoutes from './routes';

export default function useGraphData() {
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

	return graphData;
}
