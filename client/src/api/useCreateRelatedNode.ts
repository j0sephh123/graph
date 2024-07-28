import { useMutation } from '@tanstack/react-query';
import apiRoutes from './routes';
import axios from 'axios';

type NewNodeMutationVariables = {
	existingNodeId?: number;
	nodeName: string;
};

export default function useCreateRelatedNode() {
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

	return (arg: NewNodeMutationVariables) => mutateAsync(arg);
}
