import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BaseNode } from '../types';
import queryKeys from './queryKeys';
import apiRoutes from './routes';

export default function useBaseNodes() {
	const { data } = useQuery<BaseNode[]>({
		queryKey: queryKeys.rootNodes,
		queryFn: async () => {
			const res = await axios.get(apiRoutes.nodes);
			return res.data;
		},
	});

	return data;
}
