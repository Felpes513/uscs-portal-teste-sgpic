class SecretaryReportsPage {
  elements = {
    navRelatorios: () =>
      cy.get('a[routerlink="/secretaria/relatorios"]').contains(/relatórios/i),

    root: () => cy.get("app-relatorios"),
    title: () => cy.contains("app-relatorios h2", /^Relatórios Mensais$/),

    mesInput: () => cy.get('app-relatorios input#mesRef[type="month"]'),
    btnMesAnterior: () =>
      cy.get('app-relatorios button[aria-label="Mês anterior"]'),
    btnProximoMes: () =>
      cy.get('app-relatorios button[aria-label="Próximo mês"]'),

    linhasRecebidos: () =>
      cy
        .contains("section.card h3", /recebidos no mês/i)
        .closest("section.card")
        .find("tbody tr.row-link"),

    badgeRecebidos: () =>
      cy
        .contains("section.card h3", /recebidos no mês/i)
        .closest("section.card")
        .find("header .badge"),

    btnFecharTopo: () =>
      cy.get("button.btn-icon.close-btn[aria-label='Fechar formulário']"),

    btnFecharFinal: () =>
      cy.contains(".actions button.btn-secondary", /^(\s*)Fechar(\s*)$/i),
  };

  goToRelatorios() {
    this.elements.navRelatorios().should("be.visible").click();
    cy.location("pathname", { timeout: 10000 }).should(
      "eq",
      "/secretaria/relatorios",
    );
  }

  assertOnRelatoriosMensaisPage() {
    cy.location("pathname").should("eq", "/secretaria/relatorios");
    this.elements.root().should("be.visible");
    this.elements.title().should("be.visible");
    this.elements.mesInput().should("be.visible");
  }

  getMesAtual() {
    return this.elements
      .mesInput()
      .should("be.visible")
      .invoke("val")
      .then((v) => String(v || ""));
  }

  assertMesValue(mes) {
    this.elements.mesInput().should("have.value", mes);
  }

  parseMes(yyyyMm) {
    const [y, m] = String(yyyyMm).split("-").map(Number);
    return { y, m };
  }

  formatMes(y, m) {
    return `${y}-${String(m).padStart(2, "0")}`;
  }

  addMonths(yyyyMm, delta) {
    const { y, m } = this.parseMes(yyyyMm);
    let idx = y * 12 + (m - 1) + delta;
    const newY = Math.floor(idx / 12);
    const newM = (idx % 12) + 1;
    return this.formatMes(newY, newM);
  }

  clickProximoMesEValidar() {
    this.getMesAtual().then((antes) => {
      const esperado = this.addMonths(antes, +1);
      this.elements.btnProximoMes().should("be.visible").click();
      this.assertMesValue(esperado);
    });
  }

  clickMesAnteriorEValidar() {
    this.getMesAtual().then((antes) => {
      const esperado = this.addMonths(antes, -1);
      this.elements.btnMesAnterior().should("be.visible").click();
      this.assertMesValue(esperado);
    });
  }

  openPrimeiroRelatorioRecebido() {
    this.elements.badgeRecebidos().should(($b) => {
      const n = Number(($b.text() || "0").trim());
      expect(n, "badge de recebidos").to.be.greaterThan(0);
    });

    this.elements
      .linhasRecebidos()
      .should("have.length.greaterThan", 0)
      .first()
      .scrollIntoView()
      .should("be.visible")
      .click();
  }

  assertNavegouParaRelatorioReadonly() {
    cy.location("pathname", { timeout: 10000 }).should(
      "match",
      /^\/orientador\/relatorios\/\d+$/,
    );
    cy.location("search").should("include", "mes=");
    cy.location("search").should("include", "readonly=1");
  }

  assertMesNaUrl(yyyyMm) {
    cy.location("search").should("include", `mes=${yyyyMm}`);
  }

  clickFecharTopo() {
    this.elements.btnFecharTopo().should("be.visible").click();
  }

  clickFecharFinal() {
    this.elements
      .btnFecharFinal()
      .scrollIntoView()
      .should("be.visible")
      .click();
  }

  assertVoltouParaRelatoriosSecretaria() {
    cy.location("pathname", { timeout: 10000 }).should(
      "eq",
      "/secretaria/relatorios",
    );
    this.elements.root().should("be.visible");
  }
}

export default SecretaryReportsPage;
