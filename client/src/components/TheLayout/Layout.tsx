import { Link, Outlet } from 'react-router-dom';
import CreateNodeForm from '../CreateNodeForm/CreateNodeForm';
import { AppShell, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const sideWidth = 100;
const topAndBottomHeight = 50;

export default function Layout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<>
			<AppShell
				header={{ height: topAndBottomHeight }}
				footer={{ height: topAndBottomHeight }}
				navbar={{
					width: sideWidth,
					breakpoint: 'sm',
					collapsed: { mobile: !opened },
				}}
				aside={{
					width: sideWidth,
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
				<AppShell.Aside p="md">Aside</AppShell.Aside>
				<AppShell.Footer p="md">Footer</AppShell.Footer>
			</AppShell>
		</>
	);
}
