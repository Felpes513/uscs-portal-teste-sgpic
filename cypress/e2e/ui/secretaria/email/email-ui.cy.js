// D:\Projetos\Vs code\uscs-portal-teste-sgpic\cypress\e2e\ui\secretaria\email\email-ui.cy.js
import SecretariaEmailPage from "../../../../support/pages/secretaria/email/emailPage";

describe("Secretaria - Certificados (E-mail)", () => {
  const page = new SecretariaEmailPage();

  beforeEach(() => {
    cy.loginSecretariaUi();
    page.visitMenu();
  });

  it("Cenário 1 - Fazer download de exemplo de importação", () => {
    // limpa downloads pra garantir que é download novo (Windows)
    cy.exec('del /q "cypress\\downloads\\exemplo_importacao.xlsx"', {
      failOnNonZeroExit: false,
    });

    cy.intercept("GET", "**/api/relatorios/exportar-exemplo-excel").as(
      "downloadExemplo",
    );

    page.clickBaixarExemploExcel();

    cy.wait("@downloadExemplo").its("response.statusCode").should("eq", 200);

    // valida que o arquivo existe
    cy.readFile("cypress/downloads/exemplo_importacao.xlsx", {
      timeout: 20000,
      log: true,
    }).should("exist");
  });

  it("Cenário 2 - Fazer download de relatório de alunos", () => {
    cy.exec('del /q "cypress\\downloads\\relatorio_alunos.xlsx"', {
      failOnNonZeroExit: false,
    });

    cy.intercept("GET", "**/api/relatorios/relatorio-alunos").as(
      "downloadRelAlunos",
    );

    page.clickBaixarRelatorioAlunos();

    cy.wait("@downloadRelAlunos").its("response.statusCode").should("eq", 200);

    cy.readFile("cypress/downloads/relatorio_alunos.xlsx", {
      timeout: 20000,
      log: true,
    }).should("exist");
  });

  it("Cenário 3 - Fazer download de relatório de workshop", () => {
    // o arquivo baixado que você mostrou é: relatorio_workshop.xlsx
    cy.exec('del /q "cypress\\downloads\\relatorio_workshop.xlsx"', {
      failOnNonZeroExit: false,
    });

    cy.intercept("GET", "**/api/relatorios/workshop").as("downloadWorkshop");

    page.clickBaixarWorkshop();

    cy.wait("@downloadWorkshop").its("response.statusCode").should("eq", 200);

    cy.readFile("cypress/downloads/relatorio_workshop.xlsx", {
      timeout: 20000,
      log: true,
    }).should("exist");
  });

  it("Cenário 4 - Inputar documento e limpar campo de envio", () => {
    const arquivo = "cypress/support/static/email/relatorio_workshop.xlsx";

    page.attachPlanilha(arquivo);

    // após anexar, os botões devem habilitar
    page.elements.btnEnviarEmails().should("not.be.disabled");
    page.elements.btnLimpar().should("not.be.disabled");

    page.clickLimpar();

    // após limpar, volta a desabilitar
    page.elements.btnEnviarEmails().should("be.disabled");
    page.elements.btnLimpar().should("be.disabled");
  });

  it("Cenário 5 - Inputar documento e enviar", () => {
    const arquivo = "cypress/support/static/email/relatorio_workshop.xlsx";

    cy.intercept("POST", "**/api/send-emails").as("sendEmails");

    page.attachPlanilha(arquivo);

    // garante que habilitou antes de clicar
    page.elements.btnEnviarEmails().should("not.be.disabled");

    page.clickEnviarEmails();

    cy.wait("@sendEmails")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);
  });
});
