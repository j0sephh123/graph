import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import ReactQueryProvider from './ReactQueryProvider';
import router from './routing/router';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReactQueryProvider>
			<MantineProvider theme={theme} defaultColorScheme='dark'>
				<RouterProvider router={router} />
			</MantineProvider>
		</ReactQueryProvider>
	</React.StrictMode>
);
