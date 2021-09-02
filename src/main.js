/* eslint-disable no-undef */
import './main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
// eslint-disable-next-line import/extensions
import Loki from '../node_modules/@sapling-data/loki-javascript-client/dist/es-bundle';
import App from './App.vue';
import router from './router/router';
import packageJson from '../package.json';

if (import.meta.env.MODE === 'development') {
  const username = import.meta.env.VITE_LOKI_USERNAME;
  const password = import.meta.env.VITE_LOKI_PASSWORD;
  const lokiConfig = {
    baseUrl: `https://${packageJson.appInfo.loki.cloudPrefix}.saplingdata.com`,
    appName: packageJson.appInfo.loki.appName,
    cloudPrefix: packageJson.appInfo.loki.cloudPrefix,
    auth: {
      username,
      password,
    },
  };

  window.loki = new Loki(lokiConfig);
  const rootUrn = `urn:com:${packageJson.appInfo.loki.cloudName}:cloudControl`;
  const keyUrn = null;
  window.loki.environ.addConnection({
    urn: `urn:com:${packageJson.appInfo.loki.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  window.loki.environ.addConnection({
    urn: `urn:com:${packageJson.appInfo.loki.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/pages`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
    keyUrn,
  });
  window.loki.environ.addConnection({
    urn: `urn:com:${packageJson.appInfo.loki.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  window.loki.environ.addConnection({
    urn: `urn:com:${packageJson.appInfo.loki.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/pages`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
    keyUrn,
  });
} else {
  const lokiConfig = {
    baseUrl: `https://${packageJson.appInfo.loki.cloudPrefix}.saplingdata.com`,
  };
  const keyUrn = null;
  const rootUrn = `urn:com:${packageJson.appInfo.loki.cloudName}:cloudControl`;

  loki.environ.addConnection({
    urn: `urn:com:${packageJson.appInfo.loki.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  loki.environ.addConnection({
    urn: `urn:com:${packageJson.appInfo.loki.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/pages`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
    keyUrn,
  });
  loki.environ.addConnection({
    urn: `urn:com:${packageJson.appInfo.loki.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  loki.environ.addConnection({
    urn: `urn:com:${packageJson.appInfo.loki.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/pages`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
    keyUrn,
  });
}

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
