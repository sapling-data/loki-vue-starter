import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
// import packageJson from '../../package.json';

const routes = [
  {
    path: '/:pathMatch(.*)',
    component: HelloWorld,
  },
];

// Uncomment the following lines after setting up your app information in package.json
// const base = `/${packageJson.appInfo.loki.appName}/pages/urn/com/${packageJson.appInfo.loki.cloudName}/${packageJson.appInfo.loki.appName}/app/pages/${packageJson.appInfo.loki.pageName}/v/`;

const base = '/';

const router = createRouter({
  history: createWebHistory(base),
  // history: createWebHistory(base),
  base,
  routes,
});

export default router;
