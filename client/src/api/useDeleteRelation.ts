import axios from 'axios';
import apiRoutes from './routes';
import { useMutation } from '@tanstack/react-query';

type DeleteRelationInput = {
	node1Id: number;
	node2Id: number;
};

export default function useDeleteRelation() {
	const { mutateAsync } = useMutation<unknown, unknown, DeleteRelationInput>({
		mutationFn: async ({ node1Id, node2Id }) => {
      console.log({
        node1Id,
        node2Id,
      });
      
			const res = await axios.delete(apiRoutes.relations(node1Id, node2Id));
			return res.data;
		},
	});

	return mutateAsync;
}
