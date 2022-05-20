/* eslint-disable no-undef */
import './main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
// eslint-disable-next-line import/no-extraneous-dependencies
import Loki from '@sapling-data/loki-javascript-client/dist/es-bundle';
import App from './App.vue';
import router from './router/router';
// eslint-disable-next-line import/extensions
import lokiConfig from '../loki.config.mjs';

// If you are in development mode, you will need to create/authorize a new Loki instance. If your
// code is being served in production mode from a Sapling server, this step is not necessary and
// will be handled by lokiSession and the other libraries that are added on build.
if (import.meta.env.MODE === 'development') {
  lokiConfig.auth = {
    username: import.meta.env.VITE_LOKI_USERNAME,
    password: import.meta.env.VITE_LOKI_PASSWORD,
  };
  window.loki = new Loki(lokiConfig);
}

// The following code initializes connections for the CloudMenu component. Note that connections
// are added to the Loki instance and only need to be added on initialization. Since this is a
// global setup/initialization task, the responsibility for creating connections lies here
// as opposed to, for example, the setup function for the CloudMenu component itself.
const keyUrn = null;
const rootUrn = `urn:com:${lokiConfig.cloudName}:cloudControl`;
const cloudUrlBase = `https://${lokiConfig.cloudPrefix}.saplingdata.com/${lokiConfig.internal ? 'sd-cloud' : 'cloud'}`;

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
// loki.environ.addConnection({
//   urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-dev`,
//   url: `${cloudUrlBase}/api`,
//   rootUrn,
//   serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices'],
//   keyUrn,
// });
// loki.environ.addConnection({
//   urn: `urn:com:${lokiConfig.cloudName}:registry:cfg:connections:cloudControl-ui-dev`,
//   url: `${cloudUrlBase}/pages`,
//   rootUrn,
//   serviceGroupUrns: ['urn:com:saplingdata:cloudControl:model:serviceGroups:userServices-ui', 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'],
//   keyUrn,
// });

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
