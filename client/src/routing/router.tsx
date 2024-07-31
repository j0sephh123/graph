import { createBrowserRouter } from 'react-router-dom';
import SingleNodePage from '../pages/SingleNodePage';
import TheLayout from '../components/TheLayout/TheLayout';
import RootNodesPage from '../pages/RootNodesPage';
import { clientRoutes } from '../api/routes';

const router = createBrowserRouter([
	{
		path: clientRoutes.base,
		element: <TheLayout />,
		children: [
			{
				path: '',
				element: <RootNodesPage />,
			},
			{
				path: clientRoutes.singleNode,
				element: <SingleNodePage />,
			},
		],
	},
]);

export default router;
