# Loki Vue 3 + Vite Starter

Loki Vue 3 + Vite Starter is a simple way to fast-forward through the setup of a fresh Vue 3 app that can be easily deployed to Sapling Data's Loki cloud OS. This app has been initialized with [Vite](https://vitejs.dev/) and includes basic setups for [Jest](https://jestjs.io/docs/en/getting-started) and [Tailwind CSS](https://tailwindcss.com/docs).

## Quick Start
Here's how to get code into a Loki cloud ASAP:
- Create a new page in App Builder with an appropriate security function. Add a blank `index.html` file and set it as the default for the page.
- Create a new repo using the loki-vite-starter template
- Clone your new repo and run `npm install`
- Fill out the information in `loki.config.mjs`
- Create a `.env` file in your project root with the [appropriate credentials](https://github.com/sapling-data/loki-vite-starter#environment-variables) for the environment you'll be deploying to.
- If you want to use GitHub Actions to deploy your code automatically, [add your credentials to your Repository Secrets](https://github.com/sapling-data/loki-vite-starter##adding-your-credentials-as-repository-secrets)
- Run `npm run dev` to make sure your app runs on a dev server.
- Make any changes you want.
- Run `npm run loki` to build and deploy your app.

## Installation

Click the "Use the template" button at the top of the repository's GitHub page to create a new repository using the starter.

After your new repository has been cloned, run
```node
npm install
```
to install the necessary packages.

## Usage
<p>
This starter has already been initialized with the following packages and tools:<br>
:white_check_mark: Vue 3<br>
:white_check_mark: Babel<br>
:white_check_mark: Vue Router (configured with a basic example router)<br>
:white_check_mark: Pinia (configured with a basic example store)<br>
:white_check_mark: Linting on save using ESLint and the Airbnb style guide<br>
:white_check_mark: Unit testing with Jest<br>
</p>
<br>
⚙️ Because setups for Vue Router and Pinia will vary from project to project, these packages are included but not configured. You will need to determine your own routing and state management needs and configure those tools accordingly.

### Compiles and hot-reloads for development
```node
npm run dev
```

### Compiles and minifies for production
```node
npm run build
```

### Run your unit tests
An example test is included by default to ensure that Jest is functional/properly installed. You are responsible for writing the rest of the tests for your application.
```node
npm run test:unit
```
If you would like to add E2E tests, it is recommended that you add a <code>test:e2e</code> script command that will run with a <code>jest.e2e.config.js</code> file. Since component tests are common in Vue development, the <code>test:unit</code> command is included by default.
### Lints and fixes files
Linting is currently working in VS Code. Your file will be linted and fixed on save. See the [ESLint docs](https://eslint.org/) to learn how to configure lint for your particular needs.

### Deploying to Loki
The production build of your application, located in the <code>dist</code> directory by default, can be manually deployed to a page in a Loki OS application by running <code>npm run loki</code> from the command line. In order to properly deploy your code, update the following information in <code>loki.config.mjs</code>:
```js
export default {
  // The string that you want to inject into the title tag of your page
  pageTitle: 'Loki Vite Starter',
  // The Loki app that you plan to deploy to; this may need to change in production depending on your package configuration in Loki.
  appName: process.env.NODE_ENV === 'development' ? 'examples-pg' : 'examples',
  // The app model you are developing for
  appModelName: 'examples',
  // The app builder associated with your app model
  appBuilderName: 'examples-modeler',
  // The page in Loki's App Builder that you plan to deploy to
  pageName: 'helloWorld',
  // The subdomain of your cloud's url
  cloudPrefix: 'dev',
  // The name of your cloud environment
  cloudName: 'saplingdata',
  // The root of your app urn; typically the same as cloudName, but can vary for older apps
  appRoot: 'loki',
  // Is your app a Sapling internal app or a client app? Non-Sapling projects should be set to false.
  internal: true,
};
```
Please make sure you update this information correctly, since it will be used to construct the API endpoints for deploying your code. It is recommended to set up a page in Loki's App Builder (along with an appropriate security model) for your Vue app to deploy to **before** configuring your Vue app.

#### Environment variables
Deploying to Loki requires providing access to valid Loki credentials via environment variables. Add a [.env file to your project root and use dotenv](https://github.com/motdotla/dotenv#readme) to accomplish this. Use `LOKI_USERNAME`, `LOKI_PASSWORD`, `VITE_LOKI_USERNAME`, and `VITE_LOKI_PASSWORD` as your variable names.
<br>
<br>
:warning: You will need to supply your credentials twice in your `.env` file, since the same credentials are used to authenticate `loki-javascript-client` inside of Vite as well as the uploadToLoki script outside of Vite.
<br>
<br>
:warning: **DO NOT CHECK YOUR <code>.env</code> FILE INTO VERSION CONTROL** :warning:<br>
The starter's <code>.gitignore</code> file is set up to ignore <code>.env</code> files by default; do not change this.
<br>
#### GitHub Actions
The <code>loki</code> command can be directly run from the command line or used as part of a GitHub Actions build process. A basic GitHub Actions workflow YAML file has been included in this repository. By default, this workflow is set up to run on a push to the <code>main</code> branch. [This workflow can be customized](https://docs.github.com/en/actions) to suit your own development process and deployment needs. The trigger definition is commented out by default to prevent accidental use:
```
# Uncomment the lines below to enable the workflow.
# on:
#   push:
#     branches: [ main ]
```
Actions will fail until these lines are uncommented. You will need to add the appropriate secrets to your repository to enable the actions workflow to run successfully. Make sure that your secrets match the names in the worflow YAML file.

##### Adding your credentials as Repository Secrets
Your GitHub Actions workflow will need access to Loki credentials in order to run. To set this up, you'll need to add your credentials as repository secrets. These settings can be found in your repository settings under Settings > Secrets. Add your credentials under the variables LOKI_USERNAME and LOKI_PASSWORD.

Note: GitHub Actions offers a limited number of build minutes per month for free accounts. Please make sure that you are aware of your limit if you haven't used GitHub Actions before.
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
