/* eslint-disable no-undef */
import './main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
// eslint-disable-next-line import/no-extraneous-dependencies
import Loki from '@sapling-data/loki-javascript-client/dist/es-bundle';
import App from './App.vue';
import router from './router/router';
import lokiConfig from '../loki.config.mjs';

if (import.meta.env.MODE === 'development') {
  lokiConfig.baseUrl = `https://${lokiConfig.cloudPrefix}.saplingdata.com`;
  lokiConfig.auth = {
    username: import.meta.env.VITE_LOKI_USERNAME,
    password: import.meta.env.VITE_LOKI_PASSWORD,
  };

  window.loki = new Loki(lokiConfig);
  const rootUrn = `urn:com:${lokiConfig.cloudName}:cloudControl`;
  const keyUrn = null;
  const cloudUrlBase = `${lokiConfig.baseUrl}/${lokiConfig.internal ? 'sd-cloud' : 'cloud'}`;
  window.loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${cloudUrlBase}/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  window.loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
    url: `${cloudUrlBase}/pages`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
    keyUrn,
  });
  window.loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${cloudUrlBase}/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  window.loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
    url: `${cloudUrlBase}/pages`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
    keyUrn,
  });
} else {
  lokiConfig.baseUrl = `https://${lokiConfig.cloudPrefix}.saplingdata.com`;
  const keyUrn = null;
  const rootUrn = `urn:com:${lokiConfig.cloudName}:cloudControl`;
  const cloudUrlBase = `${lokiConfig.baseUrl}/${lokiConfig.internal ? 'sd-cloud' : 'cloud'}`;
  loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${cloudUrlBase}/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
    url: `${cloudUrlBase}/pages`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
    keyUrn,
  });
  loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${cloudUrlBase}/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
    url: `${cloudUrlBase}/pages`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
    keyUrn,
  });
}

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
