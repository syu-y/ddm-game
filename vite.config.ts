import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { webSocketServer } from './vite-plugin-websocket';

export default defineConfig({
	plugins: [
		webSocketServer,
		sveltekit()
	],
	server: {
		port: 5173
	}
});
