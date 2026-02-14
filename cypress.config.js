const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
  projectId: "sri9ty",
  e2e: {
    baseUrl: "http://localhost:4200",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    downloadsFolder: "cypress/downloads",

    setupNodeEvents(on, config) {
      config.env.SECRETARIA_EMAIL = process.env.CYPRESS_SECRETARIA_EMAIL;
      config.env.SECRETARIA_SENHA = process.env.CYPRESS_SECRETARIA_SENHA;

      config.env.ORIENTADOR_EMAIL = process.env.CYPRESS_ORIENTADOR_EMAIL;
      config.env.ORIENTADOR_SENHA = process.env.CYPRESS_ORIENTADOR_SENHA;

      config.env.ALUNO_EMAIL = process.env.CYPRESS_ALUNO_EMAIL;
      config.env.ALUNO_SENHA = process.env.CYPRESS_ALUNO_SENHA;

      return config;
    },
  },
});
