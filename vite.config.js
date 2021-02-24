// @ts-check
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import { fixLokiRefs } from "./fixLokiRefs";

const { resolve } = require("path");

/**
 * @type {import('vite').UserConfig}
 */
const viteConfig = {
  root: "./",
  plugins:
        process.env.APP_ENV === "development"
          ? [vue()]
          : [fixLokiRefs(), vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
    outDir: "dist",
    assetsDir: "./",
  },
};
export default defineConfig(viteConfig);
