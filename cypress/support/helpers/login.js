import SecretariaLoginPage from "../pages/login/secretariaPage";

export const loginSecretariaUi = ({ email, senha } = {}) => {
  const page = new SecretariaLoginPage();

  const finalEmail = email || Cypress.env("SECRETARIA_EMAIL");
  const finalSenha = senha || Cypress.env("SECRETARIA_SENHA");

  expect(
    finalEmail,
    "SECRETARIA_EMAIL (CYPRESS_SECRETARIA_EMAIL) definida",
  ).to.be.a("string").and.not.be.empty;

  expect(
    finalSenha,
    "SECRETARIA_SENHA (CYPRESS_SECRETARIA_SENHA) definida",
  ).to.be.a("string").and.not.be.empty;

  page.visitHome();
  page.clickLoginSecretaria();
  page.setEmail(finalEmail);
  page.setSenha(finalSenha);
  page.clickEntrar();

  cy.location("pathname", { timeout: 10000 }).should(
    "eq",
    "/secretaria/projetos",
  );
};
