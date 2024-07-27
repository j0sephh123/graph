import { createBrowserRouter } from 'react-router-dom';
import SingleNode from './SingleNode';
import Layout from './Layout';
import App from './App';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <App />,
			},
			{
				path: 'nodes/:id',
				element: <SingleNode />,
			},
		],
	},
]);

export default router;
