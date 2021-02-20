/* eslint-disable no-console */
/* eslint-disable no-loop-func */
require('dotenv').config();

const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

const baseUrl = `https://${packageJson.appInfo.loki.cloudPrefix}.saplingdata.com/${packageJson.appInfo.loki.appName}-AppBuilder/api`;
const resourceUrl = `${baseUrl}/urn/com/loki/core/model/api/resource/v`;
const pageFileListUrl = `${baseUrl}/urn/com/loki/core/model/api/list/v/urn/com/${packageJson.appInfo.loki.cloudName}/${packageJson.appInfo.loki.appName}/app/pages/${packageJson.appInfo.loki.pageName}?format=json`;
const pageFileUploadUrl = `${baseUrl}/urn/com/loki/core/model/api/resource/v/urn/com/${packageJson.appInfo.loki.cloudName}/${packageJson.appInfo.loki.appName}/app/pages/${packageJson.appInfo.loki.pageName}!`;

const pushToLoki = async () => {
  const distFiles = fs.readdirSync('./dist');

  distFiles.forEach((file) => {
    const filePath = `./dist/${file}`;

    fs.readFile(filePath, 'utf8', (err, data) => {
      const uploadUrl = pageFileUploadUrl + file;
      axios.post(
        uploadUrl,
        data,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
          auth: {
            username: process.env.LOKI_USERNAME,
            password: process.env.LOKI_PASSWORD,
          },
        },
      ).then(() => {
        console.log(`${file} uploaded to ${uploadUrl}`);
      });
    });
  });
};

function getCurrentFiles() {
  return axios({
    baseUrl,
    method: 'GET',
    auth: {
      username: process.env.LOKI_USERNAME,
      password: process.env.LOKI_PASSWORD,
    },
    url: pageFileListUrl,
  })
    .then((response) => response.data.results)
    .catch((error) => {
      console.error(error.response.data.errors);
    });
}

async function deleteCurrentFiles(files) {
  console.log(`\x1b[34mDeleting ${files.length} files from the page...\x1b[89m`);

  for (let i = 0; i < files.length; i++) {
    const deleteUrl = `${resourceUrl}/${files[i].urn.replace(/[:]/g, '/')}`;
    // eslint-disable-next-line no-await-in-loop
    await axios({
      baseUrl,
      method: 'DELETE',
      auth: {
        username: process.env.LOKI_USERNAME,
        password: process.env.LOKI_PASSWORD,
      },
      url: deleteUrl,
    }).then(() => {
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

deployApp();
