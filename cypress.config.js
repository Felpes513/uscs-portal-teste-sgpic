const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
  projectId: "sri9ty",
  e2e: {
    baseUrl: "http://localhost:4200",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      config.env.SECRETARIA_EMAIL = process.env.CYPRESS_SECRETARIA_EMAIL;
      config.env.SECRETARIA_SENHA = process.env.CYPRESS_SECRETARIA_SENHA;

      return config;
    },
  },
});
