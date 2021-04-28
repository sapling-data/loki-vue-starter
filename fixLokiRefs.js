// @ts-check
/* eslint-disable max-len */
const {
  appInfo: { loki },
} = require("./package.json");

/**
 * @param {string} h The compiled index.html HTML string, with reference to the bundled resources f in script and link taks
 * @param {string} f A bundle file name to replace with "${loki.web.resourceUrl('[f]')}""
 * @returns {string} the html string with paths in ref and src attributes replaced with loki.web.resourceUrl() functions
 */
function renameResources(h, f) {
  const urn = `urn:com:${loki.cloudCodeName}:${loki.appCodeName}:app:pages:${loki.pageCodeName}!`;
  const regexp = new RegExp(`(=")(?:)[^=]*(?:)(${f})(?:)[^=]*(")`, "g");
  return h.replace(regexp, `$1\${loki.web.resourceUrl('${urn}$2')}$3`);
}

/**
 * @returns {import('vite').Plugin} A Vite plugin to replace paths ref and src attributes in the compiled html with loki.web.resourceUrl() functions
 */
function fixLokiRefs() {
  /** @type {import('vite').Plugin} */
  const def = {
    name: "html-transform",
    enforce: "post",
    transformIndexHtml(html, ctx) {
      const bundleNames = Object.keys(ctx.bundle);
      bundleNames.push("favicon.ico");
      // eslint-disable-next-line no-use-before-define
      const n = bundleNames.reduce((r, b) => renameResources(r, b), html);
      // @ts-ignore
      // eslint-disable-next-line no-use-before-define
      return n;
    },
  };
  return def;
}

// eslint-disable-next-line import/prefer-default-export
export { fixLokiRefs };
