import AlunoLoginPage from "../../../support/pages/login/alunoPage";

describe("Login - Aluno", () => {
  const page = new AlunoLoginPage();

  it("deve acessar login de aluno e efetuar login", () => {
    page.visitHome();
    page.clickLoginAluno();

    page.setEmail("felipe.moreira@uscsonline.com.br");
    page.setSenha("123456");
    page.clickEntrar();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/aluno/projetos");
  });
});
