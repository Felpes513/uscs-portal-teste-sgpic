class ExitPage {
  elements = {
    sidenav: () => cy.get("#sidenav-nav").should("be.visible"),

    btnSair: () =>
      cy
        .get("#sidenav-nav")
        .contains("a", /^\s*Sair\s*$/i)
        .filter(":visible")
        .first(),
  };

  clickSair() {
    this.elements.sidenav();
    this.elements.btnSair().should("be.visible").click({ force: true });
  }

  validarSaiu() {
    cy.location("pathname", { timeout: 10000 }).should("eq", "/");
    cy.contains("#sidenav-nav a", /^\s*Sair\s*$/i).should("not.exist");
  }
}

export default ExitPage;
