// eslint-disable-next-line import/extensions
import lokiConfig from '../../loki.config.mjs';

const injectDevMainPlugin = () => ({
  name: 'inject-dev-main',
  enforce: 'pre',
  apply: 'serve',
  transformIndexHtml() {
    return {
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
