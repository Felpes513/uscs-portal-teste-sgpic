// D:\Projetos\Vs code\uscs-portal-teste-sgpic\cypress\support\pages\secretaria\cadastros\cadastrosPage.js

class SecretariaCadastrosPage {
  escapeRegex(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  elements = {
    // ===== MENU / ROTA =====
    menuCadastros: () =>
      cy.contains('a[routerlink="/secretaria/cadastros"]', /Cadastros/i),
    urlPath: "/secretaria/cadastros",

    // ===== TABS / SUBTABS =====
    tabAprovacoes: () =>
      cy
        .contains("header.tabs button.tab", /^\s*Aprovações\s*$/i)
        .filter(":visible")
        .first(),

    tabInadimplentes: () =>
      cy
        .contains("header.tabs button.tab", /^\s*Inadimplentes\s*$/i)
        .filter(":visible")
        .first(),

    subtabAlunos: () =>
      cy
        .contains("header.tabs button.subtab", /^\s*Alunos\s*$/i)
        .filter(":visible")
        .first(),

    subtabOrientadores: () =>
      cy
        .contains("header.tabs button.subtab", /^\s*Orientadores\s*$/i)
        .filter(":visible")
        .first(),

    // ===== FILTRO =====
    inputFiltro: () =>
      cy
        .get('header.tabs .toolbar .search input[placeholder*="filtrar"]')
        .filter(":visible")
        .first(),

    // ===== TABELA =====
    tabela: () => cy.get("table.table").filter(":visible").first(),

    rowByEmail: (email) => {
      const safe = this.escapeRegex(email);
      return cy
        .get("table.table tbody tr")
        .filter(":visible")
        .contains("td", new RegExp(safe, "i"))
        .closest("tr");
    },

    // Botões dentro da linha
    btnInadimplentarInRow: () =>
      cy
        .contains("button.btn.btn-inad", /^\s*Inadimplentar\s*$/i)
        .filter(":visible")
        .first(),

    btnPdfInRow: () =>
      cy
        .contains("button.btn", /^\s*PDF\s*$/i)
        .filter(":visible")
        .first(),

    dialogAcoes: () => cy.get("div.dialog-actions"),
    dialogAcoesNoBody: () => cy.get("body").find("div.dialog-actions"),

    btnDialogOk: () =>
      cy
        .contains("div.dialog-actions button.btn.btn-primary", /^\s*OK\s*$/i)
        .filter(":visible")
        .last(),

    btnDialogCancelar: () =>
      cy
        .contains(
          "div.dialog-actions button.btn.btn-secondary",
          /^\s*Cancelar\s*$/i,
        )
        .filter(":visible")
        .last(),

    // ====== TABELAS INADIMPLENTES ======
    tabelaInadAlunos: () => cy.get("table.inad-table").filter(":visible").eq(0),
    tabelaInadOrientadores: () =>
      cy.get("table.inad-table").filter(":visible").eq(1),

    btnAdimplentarNaLinha: (email) =>
      cy
        .contains("tr", email)
        .filter(":visible")
        .first()
        .find("button.btn.btn-approve"),
  };

  // ===== NAVEGAÇÃO =====
  visitMenu() {
    this.elements.menuCadastros().should("be.visible").click();
    cy.location("pathname").should("eq", this.elements.urlPath);
    cy.window().then((win) => win.scrollTo(0, 0));
  }

  visitUrl() {
    cy.visit(this.elements.urlPath);
    cy.location("pathname").should("eq", this.elements.urlPath);
    cy.window().then((win) => win.scrollTo(0, 0));
  }

  // ===== TABS =====
  clickTabAprovacoes() {
    this.elements.tabAprovacoes().should("be.visible").click();
  }

  clickTabInadimplentes() {
    this.elements.tabInadimplentes().should("be.visible").click();
  }

  clickSubtabAlunos() {
    this.elements.subtabAlunos().should("be.visible").click();
  }

  clickSubtabOrientadores() {
    this.elements.subtabOrientadores().should("be.visible").click();
  }

  // ===== FILTRO =====
  setFiltro(valor) {
    this.elements.inputFiltro().should("be.visible").clear().type(valor);
  }

  // ===== AÇÕES NA LINHA =====
  clickInadimplentarPorEmail(email) {
    this.elements
      .rowByEmail(email)
      .should("be.visible")
      .within(() => {
        this.elements
          .btnInadimplentarInRow()
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true });
      });
  }

  clickPdfPorEmail(email) {
    this.elements
      .rowByEmail(email)
      .should("be.visible")
      .within(() => {
        this.elements
          .btnPdfInRow()
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true });
      });
  }

  confirmarInadimplentarNoDialog() {
    this.elements.dialogAcoes().should("be.visible");
    this.elements
      .btnDialogOk()
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    // ✅ valida desapareceu sem quebrar
    this.elements.dialogAcoesNoBody().should("have.length", 0);
  }

  cancelarInadimplentarNoDialog() {
    this.elements.dialogAcoes().should("be.visible");
    this.elements
      .btnDialogCancelar()
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    // ✅ valida desapareceu sem quebrar
    this.elements.dialogAcoesNoBody().should("have.length", 0);
  }

  clickTabInadimplentes() {
    this.elements.tabInadimplentes().should("be.visible").click();
    this.elements.tabInadimplentes().should("have.class", "active");
  }

  clickAdimplentarAlunoPorEmail(email) {
    this.elements.tabelaInadAlunos().should("be.visible");
    this.elements
      .btnAdimplentarNaLinha(email)
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  }

  clickAdimplentarOrientadorPorEmail(email) {
    this.elements.tabelaInadOrientadores().should("be.visible");
    this.elements
      .btnAdimplentarNaLinha(email)
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  }

  cancelarDialog() {
    this.elements.dialogAcoes().should("have.length.at.least", 1);
    this.elements.btnDialogCancelar().should("be.visible").click();
    this.elements.dialogAcoes().should("have.length", 0);
  }

  confirmarDialog() {
    this.elements.dialogAcoes().should("have.length.at.least", 1);
    this.elements.btnDialogOk().should("be.visible").click();
  }
}

export default SecretariaCadastrosPage;
