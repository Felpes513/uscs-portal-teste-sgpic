class SecretariaAvaliadoresPage {
  escapeRegex(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  elements = {
    menuAvaliadores: () =>
      cy.contains('a[routerlink="/secretaria/avaliadores"]', /Avaliadores/i),

    urlPath: "/secretaria/avaliadores",

    btnNovoAvaliador: () =>
      cy.contains("button.btn.btn-primary", /Novo Avaliador/i),

    selectTipoAvaliador: () => cy.get("mat-select").filter(":visible").first(),

    inputNome: () =>
      cy.get('[data-testid="input-nome"]').filter(":visible").last(),

    inputEmail: () =>
      cy.get('[data-testid="input-email"]').filter(":visible").last(),

    inputEspecialidade: () =>
      cy.get('[data-testid="input-especialidade"]').filter(":visible").last(),

    inputSubespecialidade: () =>
      cy
        .get('[data-testid="input-subespecialidade"]')
        .filter(":visible")
        .last(),

    inputLattes: () =>
      cy.get('[data-testid="input-lattes"]').filter(":visible").last(),

    btnCancelar: () =>
      cy
        .contains("footer.modal-footer button.btn", /^Cancelar$/i)
        .filter(":visible")
        .last(),

    btnCadastrar: () =>
      cy.get('[data-testid="btn-salvar-avaliador"]').filter(":visible").last(),

    btnEnviarAvaliacao: () =>
      cy.contains("button.btn.btn-primary", /Enviar avaliação/i),

    selectProjeto: () =>
      cy
        .get('mat-select[name="projetoSelecionadoId"]')
        .filter(":visible")
        .first(),

    avaliadorCheckboxByText: (text) => {
      const safe = this.escapeRegex(text);
      return cy
        .contains(".checklist label", new RegExp(safe, "i"))
        .filter(":visible")
        .first()
        .find('input[type="checkbox"]');
    },

    inputAssunto: () =>
      cy
        .get('input[placeholder*="Solicitação de Avaliação"]')
        .filter(":visible")
        .first(),

    textareaMensagem: () =>
      cy
        .get('textarea[placeholder*="Texto adicional"]')
        .filter(":visible")
        .first(),

    btnCancelarEnvio: () =>
      cy
        .contains("footer button", /^Cancelar$/i)
        .filter(":visible")
        .first(),

    btnEnviarEnvio: () =>
      cy
        .get("footer button.primary")
        .contains(/^\s*Enviar\s*$/i)
        .filter(":visible")
        .last(),

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

    tabela: () => cy.get("table").filter(":visible").first(),
    tbody: () => cy.get("table tbody").filter(":visible").first(),

    rowByText: (text) => {
      if (!text) {
        throw new Error(
          `[AvaliadoresPage] rowByText(text) recebeu vazio/undefined. ` +
            `Passe um valor (recomendado: email) para localizar a linha.`,
        );
      }

      const safe = this.escapeRegex(text);

      return cy
        .get("table tbody tr")
        .filter(":visible")
        .contains(new RegExp(safe, "i"))
        .closest("tr");
    },

    linkLattesInRow: () => cy.contains("a", /Ver Lattes/i),
    btnVerEnviosInRow: () => cy.get('button[title="Ver envios"]'),
    btnEditarInRow: () => cy.get('button[title="Editar"]'),
    btnExcluirInRow: () => cy.get('button[title="Excluir"]'),

    modalEnvio: () =>
      cy
        .get(".cdk-overlay-container .cdk-overlay-pane")
        .filter(":visible")
        .last(),

    tituloModalEnvio: () =>
      cy
        .contains(
          ".cdk-overlay-container .cdk-overlay-pane",
          "Enviar projeto",
          { matchCase: false },
        )
        .filter(":visible"),
  };

  visitMenu() {
    this.elements.menuAvaliadores().should("be.visible").click();
    cy.location("pathname").should("eq", this.elements.urlPath);
    cy.window().then((win) => win.scrollTo(0, 0));
  }

  clickNovoAvaliador() {
    this.elements.btnNovoAvaliador().should("be.visible").click();
  }

  openTipoAvaliador() {
    this.elements.selectTipoAvaliador().should("be.visible").click();
  }

  chooseTipoAvaliador(tipo) {
    this.openTipoAvaliador();
    this.elements.optionByText(tipo);
    cy.get(".cdk-overlay-backdrop", { timeout: 10000 }).should("not.exist");
  }

  setNome(nome) {
    this.elements.inputNome().should("be.visible").clear().type(nome);
  }

  setEmail(email) {
    this.elements.inputEmail().should("be.visible").clear().type(email);
  }

  setEspecialidade(txt) {
    this.elements.inputEspecialidade().should("be.visible").clear().type(txt);
  }

  setSubespecialidade(txt) {
    this.elements
      .inputSubespecialidade()
      .should("be.visible")
      .clear()
      .type(txt);
  }

  setLattes(url) {
    this.elements.inputLattes().should("be.visible").clear().type(url);
  }

  clickCancelar() {
    this.elements.btnCancelar().should("be.visible").click();
  }

  clickCadastrar() {
    this.elements
      .btnCadastrar()
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  }

  assertAvaliadorNaTabela({ nome, email, especialidade, subespecialidade }) {
    this.elements
      .rowByText(email)
      .should("be.visible")
      .within(() => {
        if (nome)
          cy.contains(new RegExp(this.escapeRegex(nome), "i")).should("exist");

        if (especialidade)
          cy.contains(new RegExp(this.escapeRegex(especialidade), "i")).should(
            "exist",
          );

        if (subespecialidade)
          cy.contains(
            new RegExp(this.escapeRegex(subespecialidade), "i"),
          ).should("exist");

        this.elements.btnVerEnviosInRow().should("be.visible");
        this.elements.btnEditarInRow().should("be.visible");
        this.elements.btnExcluirInRow().should("be.visible");
      });
  }

  assertLinkLattes({ email, lattesUrl }) {
    this.elements
      .rowByText(email)
      .should("be.visible")
      .within(() => {
        this.elements
          .linkLattesInRow()
          .should("have.attr", "href", lattesUrl)
          .and("have.attr", "target", "_blank");
      });
  }

  clickVerEnvios(email) {
    this.elements.rowByText(email).within(() => {
      this.elements.btnVerEnviosInRow().should("be.visible").click();
    });
  }

  clickEditar(email) {
    this.elements.rowByText(email).within(() => {
      this.elements.btnEditarInRow().should("be.visible").click();
    });
  }

  clickExcluir(email) {
    this.elements.rowByText(email).within(() => {
      this.elements.btnExcluirInRow().should("be.visible").click();
    });
  }

  clickEnviarAvaliacao() {
    this.elements.btnEnviarAvaliacao().should("be.visible").click();
  }

  openProjeto() {
    this.elements.selectProjeto().should("be.visible").click();
  }

  chooseProjeto(textoProjeto) {
    this.openProjeto();
    this.elements.optionByText(textoProjeto);
    cy.get(".cdk-overlay-backdrop", { timeout: 10000 }).should("not.exist");
  }

  marcarAvaliadorPorTexto(texto) {
    this.elements
      .avaliadorCheckboxByText(texto)
      .should("be.visible")
      .check({ force: true });
  }

  desmarcarAvaliadorPorTexto(texto) {
    this.elements
      .avaliadorCheckboxByText(texto)
      .should("be.visible")
      .uncheck({ force: true });
  }

  setAssunto(txt) {
    this.elements.inputAssunto().should("be.visible").clear().type(txt);
  }

  setMensagem(txt) {
    this.elements.textareaMensagem().should("be.visible").clear().type(txt);
  }

  clickEnviarNoModal() {
    cy.contains(/Enviar projeto.*aos avaliadores/i, { timeout: 5000 }).should(
      "be.visible",
    );

    cy.get("footer button.primary")
      .contains(/^\s*Enviar\s*$/i)
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.wait(500);

    cy.contains(/Enviar projeto.*aos avaliadores/i, { timeout: 10000 }).should(
      "not.exist",
    );
  }

  clickCancelarEnvio() {
    this.elements.btnCancelarEnvio().should("be.visible").click();
    this.elements.btnCancelarEnvio().should("not.exist");
  }
}

export default SecretariaAvaliadoresPage;
