import { createRouter, createWebHistory } from 'vue-router';
import packageJson from '../../package.json';

/**
 * Router setup is included by default, but routes are not.
 * Please configure your own routes as appropriate.
 */
const routes = [];

/**
 * The default base value is set to a typical structure that is found in most Loki apps.
 * Please ensure that you have properly configured package.json and that the result
 * is appropriate for your particular app.
 */
const base = `/${packageJson.appInfo.loki.appName}/pages/urn/com/${packageJson.appInfo.loki.cloudName}/${packageJson.appInfo.loki.appName}/app/pages/${packageJson.appInfo.loki.pageName}/v/`;

const router = createRouter({
  history: createWebHistory(base),
  base,
  routes,
});

export default router;
