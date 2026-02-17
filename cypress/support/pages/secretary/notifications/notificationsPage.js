class SecretaryNotificationsPage {
  elements = {
    navNotificacoes: () =>
      cy
        .get('a[routerlink="/secretaria/notificacoes"]')
        .contains(/notificaç(ões|oes)/i),

    root: () => cy.get("app-notificacoes .notificacoes-container"),
    title: () => cy.contains("app-notificacoes h2", /notificaç(ões|oes)/i),

    toolbar: () => cy.get("app-notificacoes .toolbar"),
    btnLerTodas: () =>
      cy
        .get("app-notificacoes .toolbar button.btn-marcar")
        .contains(/ler todas as notificaç(ões|oes)/i),

    lista: () => cy.get("app-notificacoes .lista"),
    cards: () => cy.get("app-notificacoes .lista .notificacao[role='button']"),

    modal: () => cy.get("app-notificacoes .modal[role='dialog']"),
    modalTitulo: () => cy.get("app-notificacoes .modal #notificacaoTitulo"),
    modalBtnFechar: () =>
      cy.get("app-notificacoes .modal button.fechar[aria-label='Fechar']"),

    dialogActions: () => cy.get(".dialog-actions"),
    btnCancelarConfirm: () =>
      cy
        .get(".dialog-actions button.btn.btn-secondary")
        .contains(/^(\s*)Cancelar(\s*)$/i),
    btnOkConfirm: () =>
      cy
        .get(".dialog-actions button.btn.btn-primary")
        .contains(/^(\s*)OK(\s*)$/i),
  };

  goToNotificacoes() {
    this.elements.navNotificacoes().should("be.visible").click();
    cy.location("pathname", { timeout: 10000 }).should(
      "eq",
      "/secretaria/notificacoes",
    );
  }

  assertOnNotificacoesPage() {
    cy.location("pathname").should("eq", "/secretaria/notificacoes");
    this.elements.root().should("be.visible");
    this.elements.title().should("be.visible");
    this.elements.toolbar().should("be.visible");
    this.elements.lista().should("be.visible");
    this.elements.btnLerTodas().should("be.visible");
  }

  interceptMarkAll() {
    cy.intercept(
      "PUT",
      "/api/notificacoes/mark-all?destinatario=secretaria",
    ).as("markAll");
  }

  clickLerTodas() {
    this.elements.btnLerTodas().should("be.visible").click();
    this.elements.dialogActions().should("be.visible");
    this.elements.btnCancelarConfirm().should("be.visible");
    this.elements.btnOkConfirm().should("be.visible");
  }

  confirmarLerTodas() {
    this.interceptMarkAll();

    this.clickLerTodas();
    this.elements.btnOkConfirm().click();

    cy.wait("@markAll").then((i) => {
      expect(i.response?.statusCode, "status PUT mark-all").to.be.oneOf([
        200, 201, 204,
      ]);
    });
  }

  cancelarLerTodasEValidarSemRequest() {
    let called = 0;

    cy.intercept(
      "PUT",
      "/api/notificacoes/mark-all?destinatario=secretaria",
      (req) => {
        called += 1;
        req.continue();
      },
    ).as("markAllMaybe");

    this.clickLerTodas();
    this.elements.btnCancelarConfirm().click();

    cy.wait(600).then(() => {
      expect(called, "Não deveria chamar PUT mark-all ao cancelar").to.eq(0);
    });

    this.elements.dialogActions().should("not.exist");
  }

  abrirPrimeiraNotificacao() {
    this.elements.cards().should("have.length.greaterThan", 0);

    this.elements.cards().first().scrollIntoView().should("be.visible").click();

    this.elements.modal().should("be.visible");
    this.elements.modalTitulo().should("be.visible");
  }

  fecharModalNotificacao() {
    this.elements.modalBtnFechar().should("be.visible").click();
    this.elements.modal().should("not.exist");
  }
}

export default SecretaryNotificationsPage;
