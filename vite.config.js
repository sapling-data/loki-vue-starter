// @ts-check
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import { htmlPlugin } from "./htmlPlugin";

const { resolve } = require('path');

/**
 * @type {import('vite').UserConfig}
 */
const viteConfig = {
  root: './',
  plugins: [htmlPlugin(), vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    outDir: 'dist',
    assetsDir: './',
  },
};
export default defineConfig(viteConfig);
