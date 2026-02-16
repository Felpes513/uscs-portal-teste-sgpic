import SecretariaCadastrosPage from "../../../../support/pages/secretaria/approve-registration/registrarionPage";

describe("Secretaria - Cadastros (UI)", () => {
  const page = new SecretariaCadastrosPage();

  beforeEach(() => {
    cy.loginSecretariaUi();
  });

  it("Cenário 1 - Acessar tela de alunos e baixar PDF", () => {
    page.visitMenu();
    page.clickTabAprovacoes();
    page.clickSubtabAlunos();

    const email = "felipe.moreira@uscsonline.com.br";

    cy.intercept("GET", "**/api/alunos/1/pdf").as("getPdfAluno");

    page.setFiltro(email);
    page.clickPdfPorEmail(email);

    cy.wait("@getPdfAluno").then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 304]);
    });
  });

  it("Cenário 2 - Acessar tela de alunos e cancelar inadimplentação de aluno", () => {
    page.visitMenu();
    page.clickTabAprovacoes();
    page.clickSubtabAlunos();

    const email = "felipe.moreira@uscsonline.com.br";

    cy.intercept("PUT", "**/api/alunos/1/status**").as("putInadAluno");

    page.setFiltro(email);
    page.clickInadimplentarPorEmail(email);
    page.cancelarInadimplentarNoDialog();

    cy.get("@putInadAluno.all").should("have.length", 0);
  });

  it("Cenário 3 - Acessar tela de alunos e inadimplentar aluno", () => {
    page.visitMenu();
    page.clickTabAprovacoes();
    page.clickSubtabAlunos();

    const email = "felipe.moreira@uscsonline.com.br";

    cy.intercept("PUT", "**/api/alunos/1/status**").as("putInadAluno");

    page.setFiltro(email);
    page.clickInadimplentarPorEmail(email);
    page.confirmarInadimplentarNoDialog();

    cy.wait("@putInadAluno").then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 204]);
      expect(interception.request.url).to.include("novo_status=INADIMPLENTE");
    });
  });

  it("Cenário 4 - Acessar tela de inadimplentes e adimplentar aluno", () => {
    page.visitMenu();
    page.clickTabInadimplentes();

    const email = "felipe.moreira@uscsonline.com.br";

    cy.intercept("PUT", "**/api/alunos/1/aprovar").as("putAprovarAluno");

    page.clickAdimplentarAlunoPorEmail(email);
    page.confirmarInadimplentarNoDialog();

    cy.wait("@putAprovarAluno").then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 204]);
    });
  });

  it("Cenário 5 - Acessar tela de orientadores e cancelar inadimplentação de orientador", () => {
    page.visitMenu();
    page.clickTabAprovacoes();
    page.clickSubtabOrientadores();

    const email = "orientador.teste@uscsonline.com.br";

    cy.intercept("PUT", "**/api/orientadores/**/status**").as(
      "putInadOrientador",
    );

    page.setFiltro(email);
    page.clickInadimplentarPorEmail(email);
    page.cancelarInadimplentarNoDialog();

    cy.get("@putInadOrientador.all").should("have.length", 0);
  });

  it("Cenário 6 - Acessar tela de orientadores e inadimplentar orientador", () => {
    page.visitMenu();
    page.clickTabAprovacoes();
    page.clickSubtabOrientadores();

    const email = "orientador.teste@uscsonline.com.br";

    cy.intercept("PUT", "**/api/orientadores/**/status**").as(
      "putInadOrientador",
    );

    page.setFiltro(email);
    page.clickInadimplentarPorEmail(email);
    page.confirmarInadimplentarNoDialog();

    cy.wait("@putInadOrientador").then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 204]);
      expect(interception.request.url).to.include("novo_status=INADIMPLENTE");
    });
  });

  it("Cenário 7 - Acessar tela de inadimplentes e adimplentar orientador", () => {
    page.visitMenu();
    page.clickTabInadimplentes();

    const email = "orientador.teste@uscsonline.com.br";

    cy.intercept("PUT", "**/api/orientadores/1/aprovar").as(
      "putAprovarOrientador",
    );

    page.clickAdimplentarOrientadorPorEmail(email);
    page.confirmarInadimplentarNoDialog();

    cy.wait("@putAprovarOrientador").then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 204]);
    });
  });
});
