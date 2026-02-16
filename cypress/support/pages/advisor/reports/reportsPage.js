class OrientadorPage {
  elements = {
    cardGrid: () => cy.get(".card-grid"),
    cards: () => cy.get("[data-projeto-card]"),

    btnRelatorios: (card) => card.find("a.btn-report").contains(/relatórios/i),
    btnSelecionarAlunos: (card) =>
      card.find("a.btn-edit").contains(/selecionar alunos/i),

    relatoriosRoot: () => cy.get(".grid"),
    relatoriosForm: () => cy.get(".grid form"),
    relatoriosAside: () => cy.get(".grid aside.lista-relatorios"),

    inputReferenciaMes: () => cy.get('[formcontrolname="referenciaMes"]'),
    textareaResumo: () => cy.get('[formcontrolname="resumo"]'),
    textareaAtividades: () => cy.get('[formcontrolname="atividades"]'),
    textareaBloqueios: () => cy.get('[formcontrolname="bloqueios"]'),
    textareaProximosPassos: () => cy.get('[formcontrolname="proximosPassos"]'),
    inputHoras: () => cy.get('[formcontrolname="horas"]'),
    checkboxOk: () => cy.get('[formcontrolname="ok"]'),

    btnFechar: () => cy.contains(".actions button", /^(\s*)Fechar(\s*)$/i),
    btnConfirmar: () =>
      cy.contains(".actions button[type='submit']", /confirmar relatório/i),

    asideTitle: () =>
      cy.contains("aside.lista-relatorios h4", /status do mês selecionado/i),
    asideMuted: () => cy.get("aside.lista-relatorios .muted"),
  };

  assertOnListagemProjetosOrientador() {
    this.elements.cardGrid().should("be.visible");
    this.elements.cards().its("length").should("be.greaterThan", 0);
    cy.location("pathname").should("include", "/orientador");
  }

  openRelatoriosDoPrimeiroProjeto() {
    this.elements
      .cards()
      .first()
      .should("be.visible")
      .then(($card) => {
        const card = cy.wrap($card);
        this.elements.btnRelatorios(card).should("be.visible").click();
      });

    cy.location("pathname", { timeout: 10000 }).should(
      "match",
      /^\/orientador\/relatorios\/\d+$/,
    );
  }

  assertOnRelatoriosPage() {
    cy.location("pathname").should("match", /^\/orientador\/relatorios\/\d+$/);

    this.elements.relatoriosRoot().should("be.visible");
    this.elements.relatoriosForm().should("be.visible");
    this.elements.relatoriosAside().should("be.visible");

    this.elements.inputReferenciaMes().should("exist");
    this.elements.textareaResumo().should("exist");
    this.elements.checkboxOk().should("exist");

    this.elements.asideTitle().should("be.visible");
    this.elements.asideMuted().should("be.visible");
  }

  preencherFormularioRelatorio({
    referenciaMes,
    resumo,
    atividades,
    bloqueios,
    proximosPassos,
    horas,
    marcarOk = true,
  }) {
    if (referenciaMes) {
      this.elements
        .inputReferenciaMes()
        .should("be.visible")
        .invoke("val", referenciaMes)
        .trigger("input")
        .trigger("change");
    }

    if (resumo !== undefined) {
      this.elements.textareaResumo().clear().type(resumo);
    }
    if (atividades !== undefined) {
      this.elements.textareaAtividades().clear().type(atividades);
    }
    if (bloqueios !== undefined) {
      this.elements.textareaBloqueios().clear().type(bloqueios);
    }
    if (proximosPassos !== undefined) {
      this.elements.textareaProximosPassos().clear().type(proximosPassos);
    }
    if (horas !== undefined) {
      this.elements.inputHoras().clear().type(String(horas));
    }

    if (marcarOk) {
      this.elements.checkboxOk().check({ force: true }).should("be.checked");
    } else {
      this.elements
        .checkboxOk()
        .uncheck({ force: true })
        .should("not.be.checked");
    }
  }

  clicarFechar() {
    this.elements.btnFechar().should("be.visible").click();
  }

  confirmarRelatorioMensal() {
    cy.intercept("POST", /\/api\/\d+\/relatorios-mensais\/confirmar$/).as(
      "confirmarRelatorio",
    );

    this.elements.btnConfirmar().should("be.visible").click();

    cy.wait("@confirmarRelatorio").then((i) => {
      expect(i.response?.statusCode, "status confirmar relatório").to.be.oneOf([
        200, 201, 204,
      ]);
    });
  }
}

export default OrientadorPage;
