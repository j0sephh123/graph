import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import ReactQueryProvider from './ReactQueryProvider';
import router from './routing/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReactQueryProvider>
			<RouterProvider router={router} />
		</ReactQueryProvider>
	</React.StrictMode>
);
