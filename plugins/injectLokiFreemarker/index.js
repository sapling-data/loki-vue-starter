import path from 'path';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from 'ejs';
// eslint-disable-next-line import/extensions
import lokiConfig from '../../loki.config.mjs';

const injectLokiFreemarkerPlugin = () => ({
  name: 'inject-loki-freemarker',
  apply: 'build',
  transformIndexHtml(originalHtml, ctx) {
    const template = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');
    const html = render(template);
    const pageUrn = `urn:com:${lokiConfig.appRoot}:${lokiConfig.appModelName}:app:pages:${lokiConfig.pageName}`;
    const lokiFreemarkerExpressions = [
      'urn:com:loki:js:app:pages:lokiJs',
      'urn:com:loki:jquery:app:pages:lokiJQuery',
      'urn:com:loki:js:app:pages:lokiSession',
    ];
    const scriptTag = {
      tag: 'script',
      injectTo: 'head',
      attrs: {
        type: 'text/javascript',
      },
    };
    const jQueryTag = { ...scriptTag, ...{ attrs: { src: "${loki.web.modelResUrl('urn:opensource:libs:jquery:3.2.1!jquery-3.2.1.min.js')}" } } };
    const lokiTags = lokiFreemarkerExpressions.map((expression) => ({
      ...scriptTag, ...{ attrs: { src: `\${loki.web.pageUrlWithCacheCheck('${expression}')}` } },
    }));
    const bundleTags = Object.values(ctx.bundle).map((item) => ({
      tag: item.type === 'asset' ? 'link' : 'script',
      injectTo: 'head',
      attrs: {
        ...(item.type === 'asset' && {
          rel: 'stylesheet',
          href: `\${loki.web.resourceUrl('${pageUrn}!${item.fileName}')}`,
        }),
        ...(item.type === 'chunk' && {
          type: 'module',
          src: `\${loki.web.resourceUrl('${pageUrn}!${item.fileName}')}`,
        }),
      },
    }));
    const headTags = [{
      tag: 'link',
      injectTo: 'prepend-head',
      attrs: {
        href: `\${loki.web.resourceUrl('${pageUrn}!favicon.ico')}`,
        rel: 'icon',
      },
    },
    {
      tag: 'title',
      children: lokiConfig.pageTitle,
    }];
    return {
      html,
      tags: [...bundleTags, ...lokiTags, jQueryTag, ...headTags],
    };
  },
});

export default injectLokiFreemarkerPlugin;
