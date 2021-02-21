// @ts-check
/* eslint-disable no-console, no-loop-func, max-len */
require("dotenv").config();

const axios = require("axios").default;
const fs = require("fs");
const grayMatter = require("gray-matter");
const path = require("path");

/**
 * @typedef {import('./package.json')} PackageJson
 * @typedef {import('./types').PageDataObject} PageDataObject
 * @typedef {import('./types').QueryDataObject} QueryDataObject
 * @typedef {import('./types').ChildQuery} ChildQuery
 *
 * */

/**
 * @type {PackageJson}
 * @property {PackageJson['appInfo']} appInfo - The application definition object
 * @property {PackageJson['appInfo']['loki']} appInfo.loki - The Loki portion of the application definition
 * @property {PackageJson['appInfo']['loki']['appCodeName']} appInfo.loki.appCodeName - The URN segment identifying the Loki app that you plan to deploy to (the last segment of loki.app.rootUrn)
 * @property {PackageJson['appInfo']['loki']['pageCodeName']} appInfo.loki.pageCodeName - The page in Loki's App Builder that you plan to deploy to
 * @property {PackageJson['appInfo']['loki']['cloudPrefix']} appInfo.loki.cloudPrefix - The subdomain of your cloud's url
 * @property {PackageJson['appInfo']['loki']['cloudCodeName']} appInfo.loki.cloudCodeName - The name of your cloud environment
 * @property {PackageJson['appInfo']['loki']['pageName']} appInfo.loki.pageName - The name of the page (the page title)
 * */
const packageJson = require("./package.json");

const {
  appInfo: { loki },
} = packageJson;
const baseUrl = `https://${loki.cloudPrefix}.saplingdata.com/${loki.appCodeName}-AppBuilder/api`;
const resourceUrl = "/urn/com/loki/core/model/api/resource/v";
const pageFileListUrl = `/urn/com/loki/core/model/api/list/v/urn/com/${loki.cloudCodeName}/${loki.appCodeName}/app/pages/${loki.pageCodeName}?format=json`;
const pageFileUploadUrl = `/urn/com/loki/core/model/api/resource/v/urn/com/${loki.cloudCodeName}/${loki.appCodeName}/app/pages/${loki.pageCodeName}!`;
const pageDataUploadUrl = `/urn/com/loki/modeler/model/types/combinedPageExt/v/urn/com/${loki.cloudPrefix}/${loki.appCodeName}/app/pages/${loki.pageCodeName}`;
const queryUploadUrl = `/urn/com/loki/modeler/model/types/queryExt/v/urn/com/${loki.cloudPrefix}/${loki.appCodeName}/model/queries/${loki.pageCodeName}`;

const lokiSession = axios.create({
  baseURL: baseUrl,
  auth: {
    username: process.env.LOKI_USERNAME,
    password: process.env.LOKI_PASSWORD,
  },
});

const pushToLoki = async () => {
  const pageDataObject = pageData(loki);
  const distFiles = fs.readdirSync("./dist");
  const queryDir = "./src/queries";
  const queryFiles = fs
    .readdirSync(queryDir)
    .filter((p) => p.endsWith(".sql") || p.endsWith(".SQL"));
  if (queryFiles.length) {
    const queryData = getQueryData(loki);
    await lokiSession.post(queryUploadUrl, queryData).then(() => {
      console.log(`Query "${queryData.name}" uploaded to ${queryData.urn}`);
    });
  }

  await lokiSession.post(pageDataUploadUrl, pageDataObject).then(() => {
    console.log(
      `Loki data for "${pageDataObject.name}" saved to ${pageDataObject.urn} (${pageDataUploadUrl})`,
    );
  });
  distFiles.forEach((file) => {
    const filePath = `./dist/${file}`;

    fs.readFile(filePath, "utf8", (err, data) => {
      const baseFileName = file;
      // const baseFileName = file.replace(`${loki.pageCodeName}!`, '');
      const uploadUrl = pageFileUploadUrl + baseFileName;
      lokiSession
        .post(uploadUrl, data, {
          headers: {
            "Content-Type": "text/plain",
          },
        })
        .then(() => {
          console.log(`${file} uploaded to ${uploadUrl}`);
        });
    });
  });
};

function getCurrentFiles() {
  return lokiSession
    .get(pageFileListUrl)
    .then((response) => response.data.results)
    .catch((error) => {
      console.error(error.response.data.errors);
    });
}

async function deleteCurrentFiles(files) {
  console.log(
    `\x1b[34mDeleting ${files.length} files from the page...\x1b[89m`,
  );

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < files.length; i++) {
    const deleteUrl = `${resourceUrl}/${files[i].urn.replace(/[:]/g, "/")}`;
    // eslint-disable-next-line no-await-in-loop
    await lokiSession
      .delete(deleteUrl)
      .then(() => {
        console.log(`\x1b[32m${files[i].urn} was deleted!\x1b[32m`);
      })
      .catch((error) => {
        console.log(`There was a problem deleting ${files[i].urn}...`);
        console.error(error.response.data.errors);
      });
  }
}

async function clearFiles() {
  const currentFiles = await getCurrentFiles();
  await deleteCurrentFiles(currentFiles);
  console.log("Finished clearing previous build!");
}

const deployApp = async () => {
  await clearFiles();
  pushToLoki();
};

/**
 * @param {PackageJson['appInfo']['loki']} l The appInfo.loki attribute of package.json for the application
 * @returns {PageDataObject} A data object defining the page to save in AppBuilder
 */
function pageData(l) {
  return {
    urn: `urn:com:${l.cloudPrefix}:${l.appCodeName}:app:pages:${l.pageCodeName}`,
    names: [l.pageName],
    name: l.pageName,
    summary: "",
    description: null,
    descriptionHtml: null,
    serviceOutput: {
      outputContentTypeUrn:
                "urn:com:loki:meta:data:mediaTypes:text%2Fhtml",
      oldContentType: "urn:com:loki:meta:data:mediaTypes:text%2Fhtml",
      maxAge: "0",
    },
    operationImpls: [
      {
        operation: "urn:com:loki:core:model:operations:webService",
        method:
                    "urn:com:loki:core:model:operations:webService:methods:freemarkerPage",
        pageTemplate: `urn:com:${l.cloudPrefix}:${l.appCodeName}:app:pages:${l.pageCodeName}!index.html`,
        securityFunctionGroups: [],
        actionImpls: [
          {
            action: "urn:com:loki:core:model:actions:get",
            securityFunctionGroups: [
              `urn:com:${l.cloudPrefix}:${l.appCodeName}:model:functions:generalAccess`,
            ],
          },
        ],
      },
      {
        operation: "urn:com:loki:core:model:operations:render",
        method:
                    "urn:com:loki:freemarker:model:methods:freemarkerRender",
        pageTemplate: `urn:com:${l.cloudPrefix}:${l.appCodeName}:app:pages:${l.pageCodeName}!index.html`,
        securityFunctionGroups: [],
        actionImpls: [],
      },
    ],
    purposeUrns: ["urn:com:loki:core:data:servicePurposeSet#page"],
    boundToEntityTypeUrn: null,
    entityTypeUrns: [
      "urn:com:loki:meta:model:types:webPage",
      "urn:com:loki:meta:model:types:service",
    ],
    combinedItemUrns: [],
    inactive: false,
    lastEditByUrn: process.env.LOKI_USER_URN,
    lastEditDate: new Date().toISOString(),
    pages: [
      {
        urn: `urn:com:${l.cloudPrefix}:${l.appCodeName}:app:pages:${l.pageCodeName}!index.html`,
      },
    ],
  };
}
/**
 * @param {PackageJson['appInfo']['loki']} l The appInfo.loki attribute of package.json for the application
 * @returns {QueryDataObject} A data object defining the query to save in AppBuilder
 */
function getQueryData(l) {
  const queryUrn = `urn:com:${l.cloudPrefix}:${l.appCodeName}:model:queries:${l.pageCodeName}`;
  const srcDir = "./src/queries";
  const childQueries = [];

  fs
    .readdirSync(srcDir)
    .filter((p) => p.endsWith(".sql") || p.endsWith(".SQL"))
    .map((p) => fs.readFileSync(path.resolve(srcDir, p), "utf8"))
    .forEach((str) => {
      const hasFrontMatter = grayMatter.test(str);
      if (!hasFrontMatter) throw Error("You must include a YAML block with a name property and a dataSpaceUrn property");
      const { data, content: queryString } = grayMatter(str);
      if (!data.dataSpaceUrn) throw Error("You must specify a dataSpaceUrn");
      if (!data.name) throw Error('You must give the child query a name');
      /** @type {ChildQuery} */
      const queryObject = {
        urn: `${queryUrn}#${data.name}`,
        queryString,
        dataSpaceUrn: data.dataSpaceUrn,
        queryParams: [],
      };
      if (data.queryParams) {
        const paramNames = Object.keys(data.queryParams);
        paramNames.forEach((k) => {
          if (!data.queryParams[k].startsWith("urn:com:loki:core:model:types:")) throw Error("You must specify the loki type for the parameter");
          queryObject.queryParams.push({ codeName: k, valueTypeUrn: data.queryParams[k] });
        });
      }
      childQueries.push(queryObject);
    });

  return {
    urn: queryUrn,
    name: `${l.pageName} Queries`,
    queryString: '',
    summary: `Queries necessary to run page ${l.pageName} at urn:com:${l.cloudPrefix}:${l.appCodeName}:app:pages:${l.pageCodeName}`,
    securityFunctionUrns: [
      `urn:com:reedsmith:${l.appCodeName}:model:functions:generalAccess`,
    ],
    childQueries,
    inactive: false,
    lastEditDate: (new Date()).toISOString(),
    lastEditByUrn: process.env.LOKI_USER_URN,
  };
}

deployApp();
