class SecretariaProjetosPage {
  escapeRegex(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  elements = {
    // ===== LISTA =====
    btnAdicionarProjetoTopo: () =>
      cy.get("button.btn-add").contains(/Adicionar Projeto/i),

    btnCriarPrimeiroProjeto: () =>
      cy.get("button.btn-add").contains(/Criar primeiro projeto/i),

    btnRecarregar: () => cy.get("button.btn-reload").contains(/Recarregar/i),

    inputBuscar: () =>
      cy.get('input.search-input[placeholder*="Buscar por projeto"]'),

    // filtros
    filtroTodos: () => cy.get(".filter-buttons button").contains(/^Todos$/i),
    filtroEmExecucao: () =>
      cy.get(".filter-buttons button").contains(/Em execução/i),
    filtroConcluidos: () =>
      cy.get(".filter-buttons button").contains(/Concluídos/i),
    filtroCancelados: () =>
      cy.get(".filter-buttons button").contains(/Cancelados/i),

    paginacao: () => cy.get(".pagination"),
    paginaLabel: () => cy.get(".pagination .page-label"),
    btnPaginaPrev: () => cy.get(".pagination .page-btn").first(),
    btnPaginaNext: () => cy.get(".pagination .page-btn").last(),

    // ===== FORMULÁRIO =====
    inputCodProjeto: () => cy.get('input[name="cod_projeto"]'),
    inputTitulo: () => cy.get('input[name="titulo_projeto"]'),
    textareaResumo: () => cy.get('textarea[name="resumo"]'),
    inputBuscarOrientador: () => cy.get('input[name="busca_orientador"]'),
    inputEmailOrientador: () =>
      cy.get("input#email_orientador").filter(":visible").last(),

    selectOrientador: () =>
      cy.get('mat-select[name="orientadorSelecionadoId"]'),

    selectCampus: () => cy.get('mat-select[name="campusSelecionadoId"]'),

    optionByText: (text) => {
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
    },

    inputDocxIdeia: () =>
      cy.get('input#docxIdeia[type="file"][accept=".docx"]'),

    inputPdfIdeia: () => cy.get('input#pdfIdeia[type="file"][accept=".pdf"]'),

    btnCadastrarProjeto: () => cy.contains("button", /Cadastrar Projeto/i),
    btnCancelar: () => cy.contains("button", /Cancelar/i),
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

    cy.window().then((win) => {
      win.scrollTo(0, 0);
    });

    this.elements.inputCodProjeto().should("be.visible");
  }

  buscar(texto) {
    this.elements.inputBuscar().should("be.visible").clear().type(texto);
  }

  clickRecarregar() {
    this.elements.btnRecarregar().should("be.visible").click();
  }

  assertPaginacaoPagina1De1() {
    this.elements.paginaLabel().should("contain", "Página 1 / 1");
    this.elements.btnPaginaPrev().should("be.disabled");
    this.elements.btnPaginaNext().should("be.disabled");
  }

  assertTemMaisDeUmaPagina() {
    this.elements
      .paginaLabel()
      .invoke("text")
      .then((txt) => {
        expect(txt).to.match(/Página\s+\d+\s+\/\s+[2-9]\d*/);
      });

    this.elements.btnPaginaNext().should("not.be.disabled");
  }

  // FORMULÁRIO
  assertNaTelaNovoProjeto() {
    cy.location("pathname").should("include", "/secretaria/projetos/novo");
    this.elements.inputTitulo().should("be.visible");
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

  chooseOrientador(textoOption) {
    this.openOrientador();
    this.elements.optionByText(textoOption);
    cy.get(".cdk-overlay-backdrop", { timeout: 10000 }).should("not.exist");

    this.elements
      .inputEmailOrientador()
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty");
  }
  openCampus() {
    this.elements.selectCampus().should("be.visible").click();
  }

  chooseCampus(textoOption) {
    this.openCampus();
    this.elements.optionByText(textoOption);
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

  clickCancelar() {
    this.elements.btnCancelar().should("be.visible").click();
  }

  clickFiltroTodos() {
    this.elements.filtroTodos().should("be.visible").click();
    this.elements.filtroTodos().should("have.class", "active");
  }

  clickFiltroEmExecucao() {
    this.elements.filtroEmExecucao().should("be.visible").click();
    this.elements.filtroEmExecucao().should("have.class", "active");
  }

  clickFiltroConcluidos() {
    this.elements.filtroConcluidos().should("be.visible").click();
    this.elements.filtroConcluidos().should("have.class", "active");
  }

  clickFiltroCancelados() {
    this.elements.filtroCancelados().should("be.visible").click();
    this.elements.filtroCancelados().should("have.class", "active");
  }
}

export default SecretariaProjetosPage;
