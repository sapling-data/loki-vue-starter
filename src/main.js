/* eslint-disable no-undef */
import './main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
// eslint-disable-next-line import/no-extraneous-dependencies
import Loki from '@sapling-data/loki-javascript-client/dist/es-bundle';
import App from './App.vue';
import router from './router/router';
import lokiConfig from '../loki.config';

if (import.meta.env.MODE === 'development') {
  lokiConfig.baseUrl = `https://${lokiConfig.cloudPrefix}.saplingdata.com`;
  lokiConfig.auth = {
    username: import.meta.env.VITE_LOKI_USERNAME,
    password: import.meta.env.VITE_LOKI_PASSWORD,
  };

  window.loki = new Loki(lokiConfig);
  const rootUrn = `urn:com:${lokiConfig.cloudName}:cloudControl`;
  const keyUrn = null;
  window.loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  window.loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/pages`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
    keyUrn,
  });
  window.loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  window.loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/pages`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
    keyUrn,
  });
} else {
  lokiConfig.baseUrl = `https://${lokiConfig.cloudPrefix}.saplingdata.com`;
  const keyUrn = null;
  const rootUrn = `urn:com:${lokiConfig.cloudName}:cloudControl`;

  loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/pages`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
    keyUrn,
  });
  loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-dev`,
    url: `${lokiConfig.baseUrl}/sd-cloud/api`,
    rootUrn,
    serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
    keyUrn,
  });
  loki.environ.addConnection({
    urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
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
