import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// Proxying API requests to avoid CORS issues during development
			'/api/nodes': {
				target: 'http://localhost:3000', // Backend server
				changeOrigin: true, // Needed for virtual hosted sites
				rewrite: path => path.replace(/^\/api\/nodes/, '/api/nodes'),
			},
		},
	},
});
