import { QueryFilters, useQueryClient } from '@tanstack/react-query';

export default function useRefetchQueries() {
	const queryClient = useQueryClient();

	return (queryKeys: QueryFilters['queryKey'][]) =>
		queryKeys.forEach(queryKey => {
			queryClient.refetchQueries({
				queryKey,
			});
		});
}
