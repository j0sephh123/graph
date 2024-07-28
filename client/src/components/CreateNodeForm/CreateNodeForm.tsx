import { useRef } from 'react';
import useMutations from '../../api/useCreateLoneNode';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '../../api/queryKeys';

export default function CreateNodeForm() {
	const queryClient = useQueryClient();
	const inputRef = useRef<HTMLInputElement>(null);

	const createLoneNode = useMutations();

	const handleCreateNewNode = () => {
		createLoneNode(inputRef.current!.value).then(() => {
			inputRef.current!.value = '';
			queryClient.refetchQueries({
				queryKey: queryKeys.rootNodes,
			});
		});
	};

	return (
		<div>
			<input ref={inputRef} />
			<button onClick={handleCreateNewNode}>Create new node</button>
		</div>
	);
}
