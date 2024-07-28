import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import apiRoutes from './routes';

type NewNodeMutationVariables = {
	existingNodeId?: number;
	nodeName: string;
};

export default function useCreateLoneNode() {
	const { mutateAsync } = useMutation<
		unknown,
		unknown,
		NewNodeMutationVariables
	>({
		mutationFn: async variables => {
			const res = await axios.post(apiRoutes.nodes, {
				nodeName: variables.nodeName,
				existingNodeId: variables.existingNodeId,
			});
			return res.data;
		},
	});

	return (nodeName: string) => mutateAsync({ nodeName });
}
