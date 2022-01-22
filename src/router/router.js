import { createRouter, createWebHistory } from 'vue-router';
import lokiConfig from '../../loki.config';
import HelloWorld from '../components/HelloWorld.vue';
import TheDocs from '../components/TheDocs.vue';

const routes = [
  {
    path: '/',
    name: 'root',
    component: HelloWorld,
  },
  {
    path: '/docs',
    name: 'docs',
    component: TheDocs,
  },
];

const base = import.meta.env.MODE === 'development'
  ? `/${lokiConfig.appName}/pages/urn/com/${lokiConfig.cloudName}/${lokiConfig.appModelName}/app/pages/${lokiConfig.pageName}/v/`
  : `/${loki.urn.getLastSegment(loki.app.appInstanceUrn)}/pages/urn/com/${lokiConfig.appRoot}/${lokiConfig.appModelName}/app/pages/${lokiConfig.pageName}/v/`;

const router = createRouter({
  history: createWebHistory(base),
  base,
  routes,
});

export default router;
