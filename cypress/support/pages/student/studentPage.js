class StudentPage {
  elements = {
    scrollContainer: () => cy.get(".conteudo"),
    cardGrid: () => cy.get(".card-grid"),
    cards: () => cy.get("[data-projeto-card]"),
    btnVerProjeto: (card) => card.find("a.btn-report").contains(/ver projeto/i),

    formProjetoRoot: () => cy.get("app-formulario-projeto"),
    pageTitle: () => cy.get("app-formulario-projeto h2").first(),
    editorGrid: () => cy.get(".editor-grid"),
    historySection: () => cy.get(".history-section"),
    cardsHistory: () => cy.get(".cards-history"),
    historyCards: () => cy.get(".cards-history .history-card"),

    btnInscrever: (card) =>
      card.find("button.btn-add").contains(/^(\s*)Inscrever-se(\s*)$/i),

    btnInscrito: (card) =>
      card
        .find("button.btn-add.btn-inscrito")
        .contains(/^(\s*)Inscrito(\s*)$/i),

    btnVoltar: () => cy.get(".form-actions .btn-cancel").contains(/voltar/i),

    dialogActions: () => cy.get(".dialog-actions"),
    btnDialogCancelar: () =>
      cy.get(".dialog-actions").contains("button", /^(\s*)Cancelar(\s*)$/i),
    btnDialogOk: () =>
      cy.get(".dialog-actions").contains("button", /^(\s*)OK(\s*)$/i),
  };

  assertOnListagemProjetos() {
    this.elements.cardGrid().should("be.visible");
    this.elements.cards().its("length").should("be.greaterThan", 0);
  }

  openFirstProjeto() {
    this.elements
      .cards()
      .first()
      .should("be.visible")
      .then(($card) => {
        const card = cy.wrap($card);
        this.elements.btnVerProjeto(card).should("be.visible").click();
      });

    cy.location("pathname", { timeout: 10000 }).should(
      "match",
      /^\/aluno\/projetos\/\d+$/,
    );
  }

  assertOnProjetoDetalhe() {
    this.elements.formProjetoRoot().should("be.visible");
    this.elements.pageTitle().scrollIntoView().should("be.visible");
    this.elements.editorGrid().should("be.visible");
  }

  scrollContainerToTop() {
    this.elements
      .scrollContainer()
      .scrollTo("top", { ensureScrollable: false });

    this.elements.pageTitle().scrollIntoView().should("be.visible");
  }

  scrollContainerToBottom() {
    this.elements
      .scrollContainer()
      .scrollTo("bottom", { ensureScrollable: false });

    this.elements.btnVoltar().scrollIntoView().should("be.visible");
  }

  scrollToBottom() {
    this.scrollContainerToBottom();
  }

  assertReadOnlyForm() {
    cy.get("app-formulario-projeto input").each(($el) => {
      const disabled = $el.is(":disabled");
      const readonly = $el.is("[readonly]");
      expect(
        disabled || readonly,
        `Input deveria ser disabled/readonly: ${
          $el.attr("name") || $el.attr("id")
        }`,
      ).to.eq(true);
    });

    cy.get("app-formulario-projeto textarea").each(($el) => {
      const disabled = $el.is(":disabled");
      const readonly = $el.is("[readonly]");
      expect(
        disabled || readonly,
        `Textarea deveria ser disabled/readonly: ${
          $el.attr("name") || $el.attr("id")
        }`,
      ).to.eq(true);
    });

    cy.get("app-formulario-projeto mat-select").each(($el) => {
      expect(
        $el.attr("aria-disabled"),
        "mat-select deveria estar aria-disabled=true",
      ).to.eq("true");
    });
  }

  getHistoryCardByTitle(tituloFase) {
    return cy.get(".cards-history .history-card").filter((_, el) => {
      const t = el.querySelector(".title")?.textContent?.trim() || "";
      return t === tituloFase;
    });
  }

  getProjetoIdFromUrl() {
    return cy.location("pathname").then((p) => {
      const m = p.match(/\/aluno\/projetos\/(\d+)/);
      expect(m, `URL deveria conter /aluno/projetos/:id. Atual: ${p}`).to.not.be
        .null;
      return m[1];
    });
  }

  assertDownloaded({ projetoId, ext }) {
    const filePath = `cypress/downloads/projeto_${projetoId}.${ext}`;
    cy.readFile(filePath, { timeout: 20000 }).should("exist");
  }

  downloadByFase({ faseTitulo, tipo }) {
    const ext = tipo.toLowerCase();

    this.elements.historySection().scrollIntoView();

    this.getProjetoIdFromUrl().then((projetoId) => {
      this.getHistoryCardByTitle(faseTitulo)
        .should("have.length", 1)
        .then(($card) => {
          const card = cy.wrap($card);

          card
            .find(".actions button.btn.ghost")
            .contains(new RegExp(`^\\s*${tipo}\\s*$`, "i"))
            .scrollIntoView()
            .should("be.visible")
            .click();

          this.assertDownloaded({ projetoId, ext });
        });
    });
  }

  getFirstCardDisponivelParaInscricao() {
    return this.elements.cards().filter((_, el) => {
      const btn = el.querySelector("button.btn-add");
      if (!btn) return false;

      const txt = (btn.textContent || "").trim().toLowerCase();
      const isInscrever = txt.includes("inscrever-se");
      const isDisabled = btn.hasAttribute("disabled");

      return isInscrever && !isDisabled;
    });
  }

  getBtnInscrever() {
    return cy.contains("button.btn-add", /^(\s*)Inscrever-se(\s*)$/i);
  }

  getBtnInscrito() {
    return cy.contains("button.btn-add.btn-inscrito", /^(\s*)Inscrito(\s*)$/i);
  }

  inscreverNoPrimeiroProjetoDaListagem_Cancelar() {
    cy.location("pathname", { timeout: 10000 }).should("eq", "/aluno/projetos");

    cy.intercept("POST", "/api/inscricao/inscrever").as("postInscrever");

    cy.contains("button.btn-add", /inscrever-se/i)
      .filter(":enabled")
      .first()
      .scrollIntoView()
      .should("be.visible")
      .click();

    this.elements.dialogActions().should("be.visible");
    this.elements.btnDialogCancelar().should("be.visible").click();

    cy.wait(600);
    cy.get("@postInscrever.all").then((calls) => {
      expect(calls.length, "POST não deveria ocorrer ao cancelar").to.eq(0);
    });

    cy.contains("button.btn-add", /inscrever-se/i)
      .filter(":enabled")
      .should("exist");

    cy.location("pathname").should("eq", "/aluno/projetos");
  }

  inscreverNoPrimeiroProjetoDaListagem_OK() {
    cy.location("pathname", { timeout: 10000 }).should("eq", "/aluno/projetos");

    cy.intercept("POST", "/api/inscricao/inscrever").as("postInscrever");

    cy.contains("button.btn-add", /inscrever-se/i)
      .filter(":enabled")
      .first()
      .scrollIntoView()
      .should("be.visible")
      .click();

    this.elements.dialogActions().should("be.visible");
    this.elements.btnDialogOk().should("be.visible").click();

    cy.wait("@postInscrever")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201, 204]);

    cy.contains("button.btn-add.btn-inscrito", /inscrito/i)
      .first()
      .should("be.visible")
      .and("be.disabled");

    cy.location("pathname").should("eq", "/aluno/projetos");
  }

  clickVoltar() {
    this.elements.btnVoltar().scrollIntoView().should("be.visible").click();

    cy.location("pathname", { timeout: 10000 }).should("include", "/aluno");
  }
}

export default StudentPage;
