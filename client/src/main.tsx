import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ContextMenuProvider } from 'mantine-contextmenu';
import { ModalsProvider } from '@mantine/modals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import ReactQueryProvider from './ReactQueryProvider';
import router from './routing/router';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReactQueryProvider>
			<MantineProvider theme={theme} defaultColorScheme="dark">
				<ContextMenuProvider>
					<ModalsProvider>
						<RouterProvider router={router} />
					</ModalsProvider>
				</ContextMenuProvider>
			</MantineProvider>
		</ReactQueryProvider>
	</React.StrictMode>
);
