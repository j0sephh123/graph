import { TextInput, ActionIcon, rem } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

type P = {
	disabled?: boolean;
	onClick: () => void;
	value: string;
	setValue: (value: React.SetStateAction<string>) => void;
};

// should become fully generic
export default function InputWithIconButton({
	onClick,
	disabled,
	value,
	setValue,
}: P) {
	return (
		<TextInput
			value={value}
			onChange={event => setValue(event.currentTarget.value)}
			rightSection={
				<ActionIcon
					disabled={disabled}
					onClick={onClick}
					size={32}
					radius="xl"
					variant="filled"
				>
					<IconPlus style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
				</ActionIcon>
			}
			placeholder="New node"
		/>
	);
}
