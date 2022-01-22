export default {
  // The string that you want to inject into the title tag of your page
  pageTitle: 'Lol Vite Starter',
  // The Loki app that you plan to deploy to
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
  // Is your app a Sapling internal app or a client app?
  internal: true,
};
