import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import apiRoutes from './routes';

export default function useDeleteNode() {
	const { mutateAsync } = useMutation<unknown, unknown, number>({
		mutationFn: async existingNodeId => {
			const res = await axios.delete(apiRoutes.singleNode(existingNodeId));
			return res.data;
		},
	});

	return mutateAsync;
}
