import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modals } from '@mantine/modals';
import queryKeys from '../../api/queryKeys';
import { ActionIcon, rem, TextInput, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import axios from 'axios';
import apiRoutes from '../../api/routes';
import { useNavigate } from 'react-router-dom';

type NewNodeMutationVariables = {
	existingNodeId?: number;
	nodeName: string;
};

// FIXME - this component needs more love
export default function CreateNodeForm() {
	const navigate = useNavigate();
	const [newNodeInputValue, setNewNodeInputValue] = useState('');
	const queryClient = useQueryClient();

	const openModal = (existingNodeId: string) =>
		modals.openConfirmModal({
			title: 'Please confirm your action',
			children: (
				<Text size="sm">
					Node already exists. Do you want to go to the existing node?
				</Text>
			),
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			onCancel: () => console.log('Cancel'),
			onConfirm: () => {
				setNewNodeInputValue('');
				navigate(`/nodes/${existingNodeId}`);
			},
		});

	const { mutate: createLoneNodeMutation } = useMutation<
		| { newNodeId: number; newNodeName: string }
		| { nodeExists: true; existingNodeId: string },
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
		// TODO add notification when node is created
		onSuccess(data) {
			if ('nodeExists' in data) {
				// existingNodeId is obviously a number, but since it is returned from the api,
				// it is a string. I'm not sure if this is a good practice, but I'm
				// going to leave it as is.
				openModal(data.existingNodeId);
				return;
			}

			setNewNodeInputValue('');
			queryClient.refetchQueries({
				queryKey: queryKeys.rootNodes,
			});
		},
	});

	const handleCreateNewNode = () => {
		if (newNodeInputValue.length > 0) {
			createLoneNodeMutation({ nodeName: newNodeInputValue });
		}
	};

	return (
		<div>
			<TextInput
				value={newNodeInputValue}
				onChange={event => setNewNodeInputValue(event.currentTarget.value)}
				rightSection={
					<ActionIcon
						disabled={newNodeInputValue === ''}
						onClick={handleCreateNewNode}
						size={32}
						radius="xl"
						variant="filled"
					>
						<IconPlus
							style={{ width: rem(18), height: rem(18) }}
							stroke={1.5}
						/>
					</ActionIcon>
				}
				placeholder="New node"
			/>
		</div>
	);
}
