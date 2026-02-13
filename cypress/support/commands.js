import { loginSecretariaUi } from "./helpers/login";
import { generateCPF } from "./helpers/cpfGenerate";
import { generateProjectCode } from "./helpers/codProject";
import { generateProjectName } from "./helpers/nameProject";
import { generateProjectSummary } from "./helpers/summaryProject";

Cypress.Commands.add("loginSecretariaUi", (email, senha) => {
  return loginSecretariaUi({ email, senha });
});

Cypress.Commands.add("generateCPF", (options = {}) => {
  return generateCPF(options);
});

Cypress.Commands.add("generateProjectCode", () => {
  return generateProjectCode();
});

Cypress.Commands.add("generateProjectName", () => {
  return generateProjectName();
});

Cypress.Commands.add("generateProjectSummary", (projectName) => {
  return generateProjectSummary(projectName);
});
