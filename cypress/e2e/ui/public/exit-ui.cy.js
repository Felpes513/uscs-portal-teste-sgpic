import ExitPage from "../../../support/pages/public/exitPage";

describe("Public - Sair (Logout) com confirmação", () => {
  const page = new ExitPage();

  it("Cenário 1 - Cancelar logout deve permanecer na rota com perfil de secretaria", () => {
    cy.loginSecretariaUi();
    cy.location("pathname", { timeout: 10000 }).should("include", "/secretaria/");

    cy.location("pathname").then((p) => {
      page.clickSair();
      page.cancelarSair();
      page.validarPermaneceuNaUrl(p);
    });
  });

  it("Cenário 2 - Confirmar logout deve voltar para / com perfil de secretaria", () => {
    cy.loginSecretariaUi();
    cy.location("pathname", { timeout: 10000 }).should("include", "/secretaria/");

    page.clickSair();
    page.confirmarSair();
    page.validarSaiu();
  });

  it("Cenário 3 - Cancelar logout deve permanecer na rota com perfil de orientador", () => {
    cy.loginOrientadorUi();
    cy.location("pathname", { timeout: 10000 }).should("include", "/orientador/");

    cy.location("pathname").then((p) => {
      page.clickSair();
      page.cancelarSair();
      page.validarPermaneceuNaUrl(p);
    });
  });

  it("Cenário 4 - Confirmar logout deve voltar para / com perfil de orientador", () => {
    cy.loginOrientadorUi();
    cy.location("pathname", { timeout: 10000 }).should("include", "/orientador/");

    page.clickSair();
    page.confirmarSair();
    page.validarSaiu();
  });

  it("Cenário 5 - Cancelar logout deve permanecer na rota com perfil de aluno", () => {
    cy.loginAlunoUi();
    cy.location("pathname", { timeout: 10000 }).should("include", "/aluno/");

    cy.location("pathname").then((p) => {
      page.clickSair();
      page.cancelarSair();
      page.validarPermaneceuNaUrl(p);
    });
  });

  it("Cenário 6 - Confirmar logout deve voltar para / com perfil de aluno", () => {
    cy.loginAlunoUi();
    cy.location("pathname", { timeout: 10000 }).should("include", "/aluno/");

    page.clickSair();
    page.confirmarSair();
    page.validarSaiu();
  });
});
