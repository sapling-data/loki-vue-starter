import path from 'path';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from 'ejs';
import lokiConfig from '../../loki.config.mjs';

const injectDevMainPlugin = () => ({
  name: 'inject-dev-main',
  enforce: 'pre',
  apply: 'serve',
  transformIndexHtml() {
    const template = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');
    const html = render(template);
    return {
      html,
      tags: [{
        tag: 'script',
        injectTo: 'body',
        attrs: {
          src: '/src/main.js',
          type: 'module',
        },
      },
      {
        tag: 'title',
        children: lokiConfig.pageTitle,
      },
      {
        tag: 'link',
        injectTo: 'prepend-head',
        attrs: {
          href: '/favicon.ico',
          rel: 'icon',
        },
      }],
    };
  },
});

export default injectDevMainPlugin;
