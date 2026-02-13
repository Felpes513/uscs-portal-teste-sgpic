class SecretariaLoginPage {
  elements = {
    btnLoginSecretaria: () => cy.get("button.access-btn.funcionario"),
    inputEmail: () => cy.get('input[name="email"], input[type="email"]'),
    inputSenha: () => cy.get('input[name="senha"], input[type="password"]'),
    btnEntrar: () => cy.contains("button", /entrar|acessar|login/i),
  };

  visitHome() {
    cy.visit("/");
  }

  clickLoginSecretaria() {
    this.elements.btnLoginSecretaria().should("be.visible").click();
    cy.location("pathname").should("include", "/login");
  }

  setEmail(email) {
    this.elements.inputEmail().should("be.visible").clear().type(email);
  }

  setSenha(senha) {
    this.elements
      .inputSenha()
      .should("be.visible")
      .clear()
      .type(senha, { log: false });
  }

  clickEntrar() {
    this.elements.btnEntrar().should("be.visible").and("be.enabled").click();
  }
}

export default SecretariaLoginPage;
