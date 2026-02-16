import SecretariaLoginPage from "../pages/login/secretariaPage";
import OrientadorLoginPage from "../pages/login/orientadorPage";
import AlunoLoginPage from "../pages/login/alunoPage";

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

export const loginOrientadorUi = ({ email, senha } = {}) => {
  const page = new OrientadorLoginPage();

  const finalEmail = email || Cypress.env("ORIENTADOR_EMAIL");
  const finalSenha = senha || Cypress.env("ORIENTADOR_SENHA");

  expect(
    finalEmail,
    "ORIENTADOR_EMAIL (CYPRESS_ORIENTADOR_EMAIL) definida",
  ).to.be.a("string").and.not.be.empty;

  expect(
    finalSenha,
    "ORIENTADOR_SENHA (CYPRESS_ORIENTADOR_SENHA) definida",
  ).to.be.a("string").and.not.be.empty;

  page.visitHome();
  page.clickLoginOrientador();
  page.setEmail(finalEmail);
  page.setSenha(finalSenha);
  page.clickEntrar();

  cy.location("pathname", { timeout: 10000 }).should("not.include", "/login");
};

export const loginAlunoUi = ({ email, senha } = {}) => {
  const page = new AlunoLoginPage();

  const finalEmail = email || Cypress.env("ALUNO_EMAIL");
  const finalSenha = senha || Cypress.env("ALUNO_SENHA");

  expect(finalEmail, "ALUNO_EMAIL (CYPRESS_ALUNO_EMAIL) definida").to.be.a(
    "string",
  ).and.not.be.empty;

  expect(finalSenha, "ALUNO_SENHA (CYPRESS_ALUNO_SENHA) definida").to.be.a(
    "string",
  ).and.not.be.empty;

  page.visitHome();
  page.clickLoginAluno();
  page.setEmail(finalEmail);
  page.setSenha(finalSenha);
  page.clickEntrar();

  cy.location("pathname", { timeout: 10000 }).should("not.include", "/login");
};
