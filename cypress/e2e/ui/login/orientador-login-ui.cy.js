import OrientadorLoginPage from "../../../support/pages/login/orientadorPage";

describe("Login - Orientador", () => {
  const page = new OrientadorLoginPage();

  it("deve acessar login de orientador e efetuar login", () => {
    page.visitHome();
    page.clickLoginOrientador();

    page.setEmail("orientador@teste.com");
    page.setSenha("123456");
    page.clickEntrar();

    cy.location("pathname", { timeout: 10000 }).should(
      "eq",
      "/orientador/projetos",
    );
  });
});
