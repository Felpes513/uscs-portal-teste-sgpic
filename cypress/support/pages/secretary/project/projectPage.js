class SecretariaProjetosPage {
  escapeRegex(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  elements = {
    btnAdicionarProjetoTopo: () =>
      cy.get("button.btn-add").contains(/Adicionar Projeto/i),

    btnCriarPrimeiroProjeto: () =>
      cy.get("button.btn-add").contains(/Criar primeiro projeto/i),

    btnRecarregar: () => cy.get("button.btn-reload").contains(/Recarregar/i),

    inputBuscar: () =>
      cy.get('input.search-input[placeholder*="Buscar por projeto"]'),

    filtroTodos: () =>
      cy.contains(".filter-buttons button", /(^|\s)Todos(\s|$)/i),

    filtroEmExecucao: () =>
      cy.contains(".filter-buttons button", /Em execução/i),

    filtroConcluidos: () =>
      cy.contains(".filter-buttons button", /Concluídos/i),

    filtroCancelados: () =>
      cy.contains(".filter-buttons button", /Cancelados/i),

    inputCodProjeto: () => cy.get('input[name="cod_projeto"]'),
    inputTitulo: () => cy.get('input[name="titulo_projeto"]'),
    textareaResumo: () => cy.get('textarea[name="resumo"]'),

    inputBuscarOrientador: () => cy.get('input[name="busca_orientador"]'),
    inputEmailOrientador: () =>
      cy.get("input#email_orientador").filter(":visible").last(),

    selectOrientador: () =>
      cy.get('mat-select[name="orientadorSelecionadoId"]'),
    selectCampus: () => cy.get('mat-select[name="campusSelecionadoId"]'),

    inputDocxIdeia: () =>
      cy.get('input#docxIdeia[type="file"][accept=".docx"]'),
    inputPdfIdeia: () => cy.get('input#pdfIdeia[type="file"][accept=".pdf"]'),

    btnCadastrarProjeto: () => cy.contains("button", /Cadastrar Projeto/i),
    btnCancelar: () => cy.contains("button", /^Cancelar$/i),

    cards: () => cy.get("[data-projeto-card]").filter(":visible"),
    firstCard: () => cy.get("[data-projeto-card]").filter(":visible").first(),

    menuDropdown: () =>
      cy.get('div.menu-dropdown[role="menu"]').filter(":visible"),

    // CORRIGIDO: removido .filter(":visible") para que should("not.be.visible") funcione corretamente
    modalActions: () => cy.get("div.dialog-actions"),

    btnModalCancelar: () =>
      cy
        .get("div.dialog-actions")
        .filter(":visible")
        .contains("button.btn.btn-secondary", /^\s*Cancelar\s*$/i),

    btnModalOk: () =>
      cy
        .get("div.dialog-actions")
        .filter(":visible")
        .contains("button.btn.btn-primary", /^\s*OK\s*$/i),
  };

  visit() {
    cy.visit("/secretaria/projetos");
    cy.location("pathname").should("eq", "/secretaria/projetos");
  }

  clickNovoProjeto() {
    cy.get("body").then(($body) => {
      const hasCriarPrimeiro =
        $body.find('button.btn-add:contains("Criar primeiro projeto")').length >
        0;

      if (hasCriarPrimeiro) {
        this.elements.btnCriarPrimeiroProjeto().should("be.visible").click();
      } else {
        this.elements.btnAdicionarProjetoTopo().should("be.visible").click();
      }
    });

    cy.location("pathname").should("include", "/secretaria/projetos/novo");
    cy.window().then((win) => win.scrollTo(0, 0));
    this.elements.inputCodProjeto().should("be.visible");
  }

  buscar(texto) {
    this.elements.inputBuscar().should("be.visible").clear().type(texto);
  }

  clickRecarregar() {
    this.elements.btnRecarregar().should("be.visible").click();
  }

  setCodigo(cod) {
    this.elements
      .inputCodProjeto()
      .scrollIntoView()
      .should("be.visible")
      .clear()
      .type(cod);
  }

  setTitulo(titulo) {
    this.elements.inputTitulo().should("be.visible").clear().type(titulo);
  }

  setResumo(resumo) {
    this.elements.textareaResumo().should("be.visible").clear().type(resumo);
  }

  buscarOrientador(nome) {
    this.elements
      .inputBuscarOrientador()
      .should("be.visible")
      .clear()
      .type(nome);
  }

  openOrientador() {
    this.elements.selectOrientador().should("be.visible").click();
  }

  openCampus() {
    this.elements.selectCampus().should("be.visible").click();
  }

  optionByText(text) {
    const safe = this.escapeRegex(text);

    return cy
      .get(".cdk-overlay-container .cdk-overlay-pane")
      .filter(":visible")
      .last()
      .should("be.visible")
      .within(() => {
        cy.contains(
          "mat-option, .mat-mdc-option, .mdc-list-item, [role='option']",
          new RegExp(`\\s*${safe}\\s*`, "i"),
        )
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
      });
  }

  chooseOrientador(textoOption) {
    this.openOrientador();
    this.optionByText(textoOption);
    cy.get(".cdk-overlay-backdrop", { timeout: 10000 }).should("not.exist");

    this.elements
      .inputEmailOrientador()
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
  }

  chooseCampus(textoOption) {
    this.openCampus();
    this.optionByText(textoOption);
    cy.get(".cdk-overlay-backdrop", { timeout: 10000 }).should("not.exist");
  }

  uploadDocxIdeia(path = "cypress/support/static/ideia.docx") {
    this.elements
      .inputDocxIdeia()
      .should("exist")
      .selectFile(path, { force: true });
  }

  uploadPdfIdeia(path = "cypress/support/static/ideia.pdf") {
    this.elements
      .inputPdfIdeia()
      .should("exist")
      .selectFile(path, { force: true });
  }

  clickCadastrarProjeto() {
    this.elements
      .btnCadastrarProjeto()
      .should("be.visible")
      .and("be.enabled")
      .click();
  }

  clickFiltroTodos() {
    this.elements.filtroTodos().scrollIntoView().should("be.visible").click();
    this.elements.filtroTodos().should("have.class", "active");
  }

  clickFiltroCancelados() {
    this.elements
      .filtroCancelados()
      .scrollIntoView()
      .should("be.visible")
      .click();
    this.elements.filtroCancelados().should("have.class", "active");
  }

  clickFiltroConcluidos() {
    this.elements
      .filtroConcluidos()
      .scrollIntoView()
      .should("be.visible")
      .click();
    this.elements.filtroConcluidos().should("have.class", "active");
  }

  clickFiltroEmExecucao() {
    this.elements
      .filtroEmExecucao()
      .scrollIntoView()
      .should("be.visible")
      .click();
    this.elements.filtroEmExecucao().should("have.class", "active");
  }

  abrirMenuAcoesDoPrimeiroProjeto() {
    this.elements
      .firstCard()
      .should("be.visible")
      .within(() => {
        cy.get('button.menu-trigger[aria-label="Abrir ações do projeto"]')
          .should("be.visible")
          .click({ force: true });
      });

    this.elements.menuDropdown().should("be.visible");
  }

  clicarAcaoNoMenu(nomeAcaoRegex) {
    this.elements
      .menuDropdown()
      .contains("button.menu-item", nomeAcaoRegex)
      .should("be.visible")
      .click({ force: true });
  }

  abrirModalCancelarProjeto() {
    this.abrirMenuAcoesDoPrimeiroProjeto();
    this.clicarAcaoNoMenu(/Cancelar Projeto/i);
    this.elements.modalActions().should("be.visible");
  }

  abrirModalConcluirProjeto() {
    this.abrirMenuAcoesDoPrimeiroProjeto();
    this.clicarAcaoNoMenu(/Concluir Projeto/i);
    this.elements.modalActions().should("be.visible");
  }

  abrirModalAtivarProjeto() {
    this.abrirMenuAcoesDoPrimeiroProjeto();
    this.clicarAcaoNoMenu(/Ativar Projeto/i);
    this.elements.modalActions().should("be.visible");
  }

  interceptCancelarProjeto() {
    cy.intercept("PUT", "/api/projetos/*/cancelar").as("putCancelarProjeto");
  }

  interceptConcluirProjeto() {
    cy.intercept("PUT", "/api/projetos/*/concluir").as("putConcluirProjeto");
  }

  interceptAtivarProjeto() {
    cy.intercept("PUT", "/api/projetos/*/ativar").as("putAtivarProjeto");
  }

  // CORRIGIDO: trocado should("not.exist") por should("not.be.visible")
  modalClickCancelar_semRequest(alias) {
    this.elements.modalActions().should("be.visible");
    this.elements
      .btnModalCancelar()
      .should("be.visible")
      .click({ force: true });

    this.elements.modalActions().should("not.be.visible");

    cy.get(`${alias}.all`).then((calls) => {
      const qtd = Array.isArray(calls) ? calls.length : 0;
      expect(qtd, "não deveria chamar request").to.eq(0);
    });
  }

  // CORRIGIDO: trocado should("not.exist") por should("not.be.visible")
  modalClickOk_comRequest(alias, statusAceitos = [200, 204]) {
    this.elements.modalActions().should("be.visible");
    this.elements.btnModalOk().should("be.visible").click({ force: true });

    cy.wait(alias).then((i) => {
      expect(i.response?.statusCode, "status").to.be.oneOf(statusAceitos);
    });

    this.elements.modalActions().should("not.be.visible");
  }
}

export default SecretariaProjetosPage;
