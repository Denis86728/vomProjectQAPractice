const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",
  video: false,
  videosFolder: "cypress/videos",
  requestTimeout: 15000,
  responseTimeout: 15000,
  hideXHRInCommandLog: true,
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    env: {
      urls: {
        task1: "https://www.way2automation.com/angularjs-protractor/webtables/",
        task2: "https://www.way2automation.com/angularjs-protractor/banking/#/login",
        task3: "https://jsonplaceholder.typicode.com",
        task4: "https://albums-collection-service.herokuapp.com"
      }
    },
    setupNodeEvents(on, config) {
      return config;
    },
    excludeSpecPattern: ['*.js', '*.md'],
    specPattern: 'cypress/tests/**/*.{js,ts,tsx,feature}',
  },
});
