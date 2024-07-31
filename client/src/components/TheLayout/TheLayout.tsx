import { Link, Outlet } from 'react-router-dom';
import CreateNodeForm from '../CreateNodeForm/CreateNodeForm';
import { AppShell, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TheAside from './TheAside';
import { useSelectedNode } from '../../store/atoms';

const navbarWidth = 100;
const asideWidth = 200;
const topAndBottomHeight = 50;

export default function TheLayout() {
	const [opened, { toggle }] = useDisclosure();
	const { node } = useSelectedNode();

	return (
		<>
			<AppShell
				header={{ height: topAndBottomHeight }}
				footer={{ height: topAndBottomHeight }}
				navbar={{
					width: navbarWidth,
					breakpoint: 'sm',
					collapsed: { mobile: !opened },
				}}
				aside={{
					width: asideWidth,
					breakpoint: 'sm',
					collapsed: { desktop: false, mobile: true },
				}}
				padding="md"
			>
				<AppShell.Header>
					<Group h="100%" px="md">
						<Burger
							opened={opened}
							onClick={toggle}
							hiddenFrom="sm"
							size="sm"
						/>
						<Link to="/">Home</Link>
						<CreateNodeForm />
					</Group>
				</AppShell.Header>
				<AppShell.Navbar p="md">Sidebar</AppShell.Navbar>
				<AppShell.Main>
					<Outlet />
				</AppShell.Main>
				{node && (
					<AppShell.Aside p="md">
						<TheAside node={node} />
					</AppShell.Aside>
				)}
				<AppShell.Footer p="md">Footer</AppShell.Footer>
			</AppShell>
		</>
	);
}
