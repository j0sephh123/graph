import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import apiRoutes from './routes';

type Variables = {
	node1Id: number;
	node2Id: number;
};

export default function useAddRelation() {
	const { mutateAsync } = useMutation<unknown, unknown, Variables>({
		mutationFn: async variables => {
			const res = await axios.post(apiRoutes.addRelation, variables);
			return res.data;
		},
	});

	return (variables: Variables) => mutateAsync(variables);
}
