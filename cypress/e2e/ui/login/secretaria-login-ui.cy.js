import SecretariaLoginPage from "../../../support/pages/login/secretariaPage";

describe("Login - Secretaria", () => {
  const page = new SecretariaLoginPage();

  it("deve acessar login de secretaria e efetuar login", () => {
    page.visitHome();
    page.clickLoginSecretaria();

    page.setEmail("admin.secretaria@facul.br");
    page.setSenha("USCSAdm2025");
    page.clickEntrar();

    cy.location("pathname", { timeout: 10000 }).should(
      "eq",
      "/secretaria/projetos",
    );
  });
});
