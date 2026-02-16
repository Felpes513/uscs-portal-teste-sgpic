import ExitPage from "../../../support/pages/public/exitPage";

describe("Public - Sair (Logout)", () => {
  const page = new ExitPage();

  it("Cenário 1 - Logout Secretaria", () => {
    cy.loginSecretariaUi();
    cy.location("pathname", { timeout: 10000 }).should(
      "include",
      "/secretaria/",
    );

    page.clickSair();
    page.validarSaiu();
  });

  it("Cenário 2 - Logout Orientador", () => {
    cy.loginOrientadorUi();
    cy.location("pathname", { timeout: 10000 }).should(
      "include",
      "/orientador/",
    );

    page.clickSair();
    page.validarSaiu();
  });

  it("Cenário 3 - Logout Aluno", () => {
    cy.loginAlunoUi();
    cy.location("pathname", { timeout: 10000 }).should("include", "/aluno/");

    page.clickSair();
    page.validarSaiu();
  });
});
