class StudentPage {
  elements = {
    // listagem
    cardGrid: () => cy.get(".card-grid"),
    cards: () => cy.get("[data-projeto-card]"),
    btnVerProjeto: (card) => card.find("a.btn-report").contains(/ver projeto/i),

    // detalhes do projeto
    formProjetoRoot: () => cy.get("app-formulario-projeto"),
    pageTitle: () => cy.contains("h2", /^Projeto$/),

    editorGrid: () => cy.get(".editor-grid"),
    historySection: () => cy.get(".history-section"),
    cardsHistory: () => cy.get(".cards-history"),
    historyCards: () => cy.get(".cards-history .history-card"),

    btnVoltar: () => cy.get(".form-actions .btn-cancel").contains(/voltar/i),
  };

  // =========================
  // Listagem
  // =========================
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

  // =========================
  // Detalhe do Projeto (view-only)
  // =========================
  assertOnProjetoDetalhe() {
    this.elements.formProjetoRoot().should("be.visible");
    this.elements.pageTitle().should("be.visible");
    this.elements.editorGrid().should("be.visible");
  }

  /**
   * Garante que o formulário está apenas para leitura.
   * (inputs/textarea disabled/readonly)
   */
  assertReadOnlyForm() {
    // inputs disabled (ex: codigo, titulo, busca orientador)
    cy.get("app-formulario-projeto input").each(($el) => {
      const disabled = $el.is(":disabled");
      const readonly = $el.is("[readonly]");
      expect(
        disabled || readonly,
        `Input deveria ser disabled/readonly: ${$el.attr("name") || $el.attr("id")}`,
      ).to.eq(true);
    });

    // textarea disabled/readonly
    cy.get("app-formulario-projeto textarea").each(($el) => {
      const disabled = $el.is(":disabled");
      const readonly = $el.is("[readonly]");
      expect(
        disabled || readonly,
        `Textarea deveria ser disabled/readonly: ${$el.attr("name") || $el.attr("id")}`,
      ).to.eq(true);
    });

    // mat-select normalmente fica com aria-disabled="true"
    cy.get("app-formulario-projeto mat-select").each(($el) => {
      expect(
        $el.attr("aria-disabled"),
        "mat-select deveria estar aria-disabled=true",
      ).to.eq("true");
    });
  }

  /**
   * Rola até o fim do formulário (garante que os botões do histórico e o Voltar ficam visíveis)
   */
  scrollToBottom() {
    // forma mais estável: levar o "Voltar" para a tela
    this.elements.btnVoltar().scrollIntoView().should("be.visible");
  }

  // =========================
  // Downloads por fase
  // =========================
  getHistoryCardByTitle(tituloFase) {
    // pega o card que contém o título (div.title)
    return this.elements.historyCards().filter((_, el) => {
      const t = el.querySelector(".title")?.textContent?.trim() || "";
      return t === tituloFase;
    });
  }

  /**
   * Valida se botões PDF/DOCX estão habilitados ou desabilitados dentro da fase
   * e opcionalmente clica.
   *
   * tipo = "PDF" | "DOCX"
   * options:
   *  - enabled: true/false
   *  - click: true/false
   */
  handleDownload({ faseTitulo, tipo, enabled, click = false }) {
    this.getHistoryCardByTitle(faseTitulo)
      .should("have.length", 1)
      .then(($card) => {
        const card = cy.wrap($card);

        const btn = card
          .find(".actions button.btn.ghost")
          .contains(new RegExp(`^\\s*${tipo}\\s*$`, "i"));

        if (enabled === true) {
          btn.should("be.visible").and("not.be.disabled");
          if (click) btn.click();
        } else if (enabled === false) {
          btn.should("be.visible").and("be.disabled");
        } else {
          // só garante que existe
          btn.should("exist");
          if (click) btn.click();
        }
      });
  }

  clickVoltar() {
    this.elements.btnVoltar().should("be.visible").click();
    cy.location("pathname", { timeout: 10000 }).should("include", "/aluno");
  }
}

export default StudentPage;
