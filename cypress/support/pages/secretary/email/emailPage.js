class SecretariaEmailPage {
  elements = {
    menuCertificados: () =>
      cy.contains('a[routerlink="/secretaria/email"]', /Certificados/i),

    urlPath: "/secretaria/email",

    btnBaixarExemploExcel: () =>
      cy
        .get('a[href="/api/relatorios/exportar-exemplo-excel"]')
        .filter(":visible")
        .first(),

    btnBaixarRelatorioAlunos: () =>
      cy
        .get('a[href="/api/relatorios/relatorio-alunos"]')
        .filter(":visible")
        .first(),

    btnBaixarWorkshop: () =>
      cy.get('a[href="/api/relatorios/workshop"]').filter(":visible").first(),

    inputFilePlanilha: () =>
      cy
        .get('input[type="file"].file-input')
        .should("have.length.at.least", 1)
        .first(),

    btnEnviarEmails: () =>
      cy
        .contains("button.btn", /Enviar e-mails/i)
        .filter(":visible")
        .first(),

    btnLimpar: () =>
      cy.contains("button.btn.btn-outline", /^\s*Limpar\s*$/i).first(),
  };

  visitMenu() {
    this.elements.menuCertificados().should("be.visible").click();
    cy.location("pathname").should("eq", this.elements.urlPath);
    cy.window().then((win) => win.scrollTo(0, 0));
  }

  visitUrl() {
    cy.visit(this.elements.urlPath);
    cy.location("pathname").should("eq", this.elements.urlPath);
    cy.window().then((win) => win.scrollTo(0, 0));
  }

  clickBaixarExemploExcel() {
    this.elements
      .btnBaixarExemploExcel()
      .should("be.visible")
      .click({ force: true });
  }

  clickBaixarRelatorioAlunos() {
    this.elements
      .btnBaixarRelatorioAlunos()
      .should("be.visible")
      .click({ force: true });
  }

  clickBaixarWorkshop() {
    this.elements
      .btnBaixarWorkshop()
      .should("be.visible")
      .click({ force: true });
  }

  attachPlanilha(caminhoArquivo) {
    this.elements
      .inputFilePlanilha()
      .should("exist")
      .selectFile(caminhoArquivo, { force: true });
  }

  clickEnviarEmails() {
    this.elements
      .btnEnviarEmails()
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });
  }

  clickLimpar() {
    this.elements
      .btnLimpar()
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });
  }
}

export default SecretariaEmailPage;
