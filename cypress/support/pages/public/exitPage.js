class ExitPage {
  elements = {
    sidenavNav: () => cy.get("#sidenav-nav").should("be.visible"),

    // Link de logout (robusto: ícone logout dentro do <a href="#">)
    btnLogout: () =>
      cy
        .get("#sidenav-nav")
        .find('a[href="#"]')
        .filter((_, el) => {
          const icon = el.querySelector("mat-icon");
          const iconText = (icon?.textContent || "").trim().toLowerCase();
          return iconText === "logout";
        })
        .first(),

    // Modal de confirmação (igual ao seu HTML)
    dialogActions: () => cy.get(".dialog-actions").should("be.visible"),
    btnCancelar: () =>
      cy
        .get(".dialog-actions")
        .contains("button.btn.btn-secondary", /^(\s*)Cancelar(\s*)$/i),
    btnOk: () =>
      cy
        .get(".dialog-actions")
        .contains("button.btn.btn-primary", /^(\s*)OK(\s*)$/i),
  };

  clickSair() {
    this.elements.sidenavNav();
    this.elements.btnLogout().should("be.visible").click({ force: true });
    this.elements.dialogActions(); // garante que abriu o modal
  }

  cancelarSair() {
    this.elements.btnCancelar().should("be.visible").click();
    cy.get(".dialog-actions").should("not.exist"); // modal fecha
  }

  confirmarSair() {
    this.elements.btnOk().should("be.visible").click();
  }

  validarPermaneceuNaUrl(urlEsperada) {
    cy.location("pathname", { timeout: 10000 }).should("eq", urlEsperada);
  }

  validarSaiu() {
    cy.location("pathname", { timeout: 10000 }).should("eq", "/");
    cy.get("#sidenav-nav").should("not.exist");
  }
}

export default ExitPage;
