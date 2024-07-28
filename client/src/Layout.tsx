import { Link, Outlet } from 'react-router-dom';
import CreateNodeForm from './components/CreateNodeForm/CreateNodeForm';

export default function Layout() {
	return (
		<div>
			<Link to="/">Home</Link>
			<CreateNodeForm />
			<Outlet />
		</div>
	);
}
