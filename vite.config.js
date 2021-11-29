import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const { resolve } = require('path');
const packageJson = require('./package.json');

export default defineConfig({
	root: './',
	base:
		process.env.NODE_ENV === 'production'
			? `/${packageJson.appInfo.loki.appName}/api/urn/com/loki/core/model/api/modelResource/v/urn/com/${packageJson.appInfo.loki.cloudName}/${packageJson.appInfo.loki.appName}/app/pages/${packageJson.appInfo.loki.pageName}/`
			: '/',
	plugins: [vue()],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
			},
		},
		outDir: 'dist',
		assetsDir: './',
	},
});
