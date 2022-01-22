import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import injectLokiFreemarkerPlugin from './plugins/injectLokiFreemarker';
import injectDevMainPlugin from './plugins/injectDevMain';
// eslint-disable-next-line import/extensions
import lokiConfig from './loki.config.mjs';

const { resolve } = require('path');

export default defineConfig({
  root: './',
  base: process.env.NODE_ENV === 'production' ? `/${lokiConfig.appName}/api/urn/com/loki/core/model/api/modelResource/v/urn/com/${lokiConfig.cloudName}/${lokiConfig.appName}/app/pages/${lokiConfig.pageName}/` : '/',
  plugins: [
    vue(),
    injectDevMainPlugin(),
    injectLokiFreemarkerPlugin(),
  ],
  build: {
    rollupOptions: {
      input: {
        html: resolve(__dirname, 'index.html'),
        main: resolve(__dirname, 'src/main.js'),
      },
    },
    outDir: 'dist',
    assetsDir: './',
  },
});
