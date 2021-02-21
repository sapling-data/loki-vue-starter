// @ts-check
/* eslint-disable no-console, no-loop-func */
require('dotenv').config();

/** @typedef {import('./package.json')} PackageJson */

const axios = require('axios').default;
const fs = require('fs');

/** @type {PackageJson} */
const packageJson = require('./package.json');

const {
  appInfo: { loki },
} = packageJson;
const baseUrl = `https://${loki.cloudPrefix}.saplingdata.com/${loki.appCodeName}-AppBuilder/api`;
const resourceUrl = '/urn/com/loki/core/model/api/resource/v';
const pageFileListUrl = `/urn/com/loki/core/model/api/list/v/urn/com/${loki.cloudCodeName}/${loki.appCodeName}/app/pages/${loki.pageCodeName}?format=json`;
const pageFileUploadUrl = `/urn/com/loki/core/model/api/resource/v/urn/com/${loki.cloudCodeName}/${loki.appCodeName}/app/pages/${loki.pageCodeName}!`;
const pageDataUploadUrl = `/urn/com/loki/modeler/model/types/combinedPageExt/v/urn/com/${loki.cloudPrefix}/${loki.appCodeName}/app/pages/${loki.pageCodeName}`;

const lokiSession = axios.create({
  baseURL: baseUrl,
  auth: {
    username: process.env.LOKI_USERNAME,
    password: process.env.LOKI_PASSWORD,
  },
});


const pushToLoki = async () => {
  const pageDataObject = pageData(loki);
  const distFiles = fs.readdirSync('./dist');

  await lokiSession.post(pageDataUploadUrl, pageDataObject).then(() => {
    console.log(
      `Loki data for "${pageDataObject.name}" saved to ${pageDataObject.urn} (${pageDataUploadUrl})`,
    );
  });
  distFiles.forEach((file) => {
    const filePath = `./dist/${file}`;

    fs.readFile(filePath, 'utf8', (err, data) => {
      const baseFileName = file;
      // const baseFileName = file.replace(`${loki.pageCodeName}!`, '');
      const uploadUrl = pageFileUploadUrl + baseFileName;
      lokiSession
        .post(uploadUrl, data, {
          headers: {
            'Content-Type': 'text/plain',
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
    const deleteUrl = `${resourceUrl}/${files[i].urn.replace(/[:]/g, '/')}`;
    // eslint-disable-next-line no-await-in-loop
    await lokiSession
      .delete(deleteUrl)
      .then((d) => {
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
  console.log('Finished clearing previous build!');
}

const deployApp = async () => {
  await clearFiles();
  pushToLoki();
};

/**
 * @param {PackageJson['appInfo']['loki']} l The appInfo.loki attribute of package.json for the application
 * @returns {import('./types').PageDataObject} A data object defining the page to save in AppBuilder
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
deployApp();
