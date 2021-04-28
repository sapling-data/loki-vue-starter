const { appInfo: { loki } } = require('./package.json');

const resourceRootUrn = `urn:com:${loki.cloudCodeName}:${loki.appCodeName}:app:pages:${loki.pageCodeName}!`;
/**
 * @param {string} htmlstring An HTML string
 * @param {string} filename A bundle file name to replace with "${loki.web.resourceUrl('[b]')}""
 */
function replacePathWithLokiResource(htmlstring, filename) {
  const regexp = new RegExp(
    `(=")(?:)[^=]*(?:)(${filename})(?:)[^=]*(")`,
    'g',
  );
  return htmlstring.replace(
    regexp,
    `$1\${loki.web.resourceUrl('${resourceRootUrn}$2')}$3`,
  );
}
const htmlPlugin = () => {
  /** @type {import('vite').Plugin} */
  const def = {
    name: 'html-transform',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      const bundleNames = Object.keys(ctx.bundle);
      bundleNames.push('favicon.ico');
      // eslint-disable-next-line no-use-before-define
      const newHtml = bundleNames.reduce(
        (r, b) => replacePathWithLokiResource(r, b),
        html,
      );
      // @ts-ignore
      // eslint-disable-next-line no-use-before-define
      return newHtml;
    },
  };
  return def;
};

// eslint-disable-next-line import/prefer-default-export
export { htmlPlugin }