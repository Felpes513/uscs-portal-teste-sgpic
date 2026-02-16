class SelectStudentsPage {
  elements = {
    scrollContainer: () => cy.get(".conteudo"),

    cardGrid: () => cy.get(".card-grid"),
    cards: () => cy.get("[data-projeto-card]"),

    btnSelecionarAlunos: (card) =>
      card.find("a.btn-edit").contains(/selecionar alunos/i),

    formProjetoRoot: () => cy.get("app-formulario-projeto"),
    pageTitle: () => cy.get("app-formulario-projeto h2").first(),

    editorGrid: () => cy.get(".editor-grid"),
    colForm: () => cy.get(".col-form"),
    colInscritos: () => cy.get(".col-inscritos"),

    painelAlunos: () => cy.get("app-listagem-alunos section.painel"),
    titleSelecionarAlunos: () =>
      cy.contains("app-listagem-alunos h3", /Selecionar alunos/i),

    paneDisponiveis: () =>
      cy.contains(".split-pane h4", /Disponíveis/i).parents(".split-pane"),
    paneSelecionados: () =>
      cy.contains(".split-pane h4", /Selecionados/i).parents(".split-pane"),

    listaDisponiveis: () =>
      cy
        .contains(".split-pane h4", /Disponíveis/i)
        .parents(".split-pane")
        .find("ul.lista"),

    itensDisponiveis: () =>
      cy
        .contains(".split-pane h4", /Disponíveis/i)
        .parents(".split-pane")
        .find("ul.lista li.item"),

    checkboxDoItem: (item) =>
      item.find('input[type="checkbox"][role="switch"]'),

    btnSalvarSelecao: () =>
      cy.contains(
        "app-listagem-alunos .form-actions button",
        /salvar seleção/i,
      ),

    contadorMini: () => cy.get("app-listagem-alunos .form-actions .mini"),

    btnVoltar: () => cy.get(".form-actions .btn-cancel").contains(/voltar/i),
  };

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
  }

  assertOnListagemProjetosOrientador() {
    this.elements.cardGrid().should("be.visible");
    this.elements.cards().its("length").should("be.greaterThan", 0);
    cy.location("pathname").should("include", "/orientador");
  }

  openSelecionarAlunosDoPrimeiroProjeto() {
    this.elements
      .cards()
      .first()
      .should("be.visible")
      .then(($card) => {
        const card = cy.wrap($card);
        this.elements.btnSelecionarAlunos(card).should("be.visible").click();
      });

    cy.location("pathname", { timeout: 10000 }).should(
      "match",
      /^\/orientador\/projetos\/\d+$/,
    );
  }

  assertOnSelecionarAlunosPage() {
    cy.location("pathname").should("match", /^\/orientador\/projetos\/\d+$/);

    this.elements.formProjetoRoot().should("be.visible");
    this.elements.pageTitle().should("be.visible");
    this.elements.editorGrid().should("be.visible");

    this.elements
      .pageTitle()
      .invoke("text")
      .then((t) => {
        expect(
          t.trim().toLowerCase(),
          "Título da página do orientador",
        ).to.include("selecionar alunos");
      });

    this.elements.painelAlunos().should("be.visible");
    this.elements.titleSelecionarAlunos().should("be.visible");
    this.elements.paneDisponiveis().should("be.visible");
    this.elements.paneSelecionados().should("be.visible");
    this.elements.btnSalvarSelecao().should("be.visible");
    this.elements.contadorMini().should("be.visible");
  }

  assertProjetoReadOnly() {
    cy.get("app-formulario-projeto input").each(($el) => {
      const disabled = $el.is(":disabled");
      const readonly = $el.is("[readonly]");
      expect(
        disabled || readonly,
        `Input deveria ser disabled/readonly: ${$el.attr("name") || $el.attr("id")}`,
      ).to.eq(true);
    });

    cy.get("app-formulario-projeto textarea").each(($el) => {
      const disabled = $el.is(":disabled");
      const readonly = $el.is("[readonly]");
      expect(
        disabled || readonly,
        `Textarea deveria ser disabled/readonly: ${$el.attr("name") || $el.attr("id")}`,
      ).to.eq(true);
    });

    cy.get("app-formulario-projeto mat-select").each(($el) => {
      expect(
        $el.attr("aria-disabled"),
        "mat-select deveria estar aria-disabled=true",
      ).to.eq("true");
    });
  }

  assertContadorSelecionados({ selecionados, limite = 4 }) {
    this.elements
      .contadorMini()
      .invoke("text")
      .then((txt) => {
        const norm = txt.replace(/\s+/g, " ").trim();
        expect(norm).to.match(new RegExp(`Selecionados:\\s*${selecionados}`));
        expect(norm).to.match(new RegExp(`Limite:\\s*${limite}`));
      });
  }

  selecionarPrimeirosNDisponiveis(n = 1) {
    this.elements.itensDisponiveis().should("have.length.greaterThan", 0);

    for (let i = 0; i < n; i++) {
      this.elements
        .itensDisponiveis()
        .eq(i)
        .then(($li) => {
          const item = cy.wrap($li);
          this.elements.checkboxDoItem(item).should("be.visible").check({
            force: true,
          });
        });
    }
  }

  naoDevePermitirMaisQue4() {
    this.selecionarPrimeirosNDisponiveis(4);
    this.assertContadorSelecionados({ selecionados: 4, limite: 4 });

    this.elements
      .itensDisponiveis()
      .eq(4)
      .then(($li) => {
        const item = cy.wrap($li);

        this.elements.checkboxDoItem(item).then(($cb) => {
          const disabled = $cb.is(":disabled");

          if (disabled) {
            cy.wrap($cb).should("be.disabled");
          } else {
            cy.wrap($cb).check({ force: true });
          }
        });
      });

    this.assertContadorSelecionados({ selecionados: 4, limite: 4 });
  }

  salvarSelecaoComIntercept() {
    cy.intercept(
      /(POST|PUT|PATCH)/,
      /\/api\/projetos\/\d+\/(selecionados|selecionar)(\/.*)?$/,
    ).as("salvarSelecao");

    this.elements.btnSalvarSelecao().should("be.visible").click();

    cy.wait("@salvarSelecao").then((i) => {
      expect(i.response?.statusCode, "status salvar seleção").to.be.oneOf([
        200, 201, 204,
      ]);
    });
  }

  clickVoltar() {
    this.elements.btnVoltar().scrollIntoView().should("be.visible").click();
    cy.location("pathname", { timeout: 10000 }).should(
      "include",
      "/orientador",
    );
  }
}

export default SelectStudentsPage;
