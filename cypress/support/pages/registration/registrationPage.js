class RegistrationPage {
  elements = {
    // Alunos
    btnCriarConta: () => cy.contains("button", /Criar Conta/i),
    btnSouAluno: () => cy.contains("button", /Sou Aluno/i),
    btnSouOrientador: () => cy.contains("button", /Sou Orientador/i),

    inputNome: () => cy.get('input[name="alu_nome"]'),
    inputCpf: () => cy.get('input[name="alu_cpf"]'),
    inputEmail: () => cy.get('input[name="alu_email"]'),
    inputSenha: () => cy.get('input[name="alu_senha"]'),
    inputConfirmarSenha: () => cy.get('input[name="alu_confirma"]'),

    btnProximo: () => cy.contains("button", /Próximo/i),
    btnVoltar: () => cy.contains("button", /Voltar/i),

    selectCurso: () => cy.get('mat-select[name="alu_curso"]'),
    selectCampus: () => cy.get('mat-select[name="alu_campus"]'),

    optionByText: (text) =>
      cy
        .get(".cdk-overlay-container .cdk-overlay-pane")
        .should("be.visible")
        .find('[role="option"], .mat-mdc-option, .mdc-list-item')
        .contains(new RegExp(text, "i")),

    inputNotasPdf: () => cy.get('input[type="file"][accept="application/pdf"]'),

    alunoTrabalhaSimLabel: () =>
      cy.contains("label.radio", /Possui trabalho remunerado/i),
    alunoTrabalhaNaoLabel: () => cy.contains("label.radio", /^Não possui$/i),

    checkboxTermosFinal: () =>
      cy.get('input[type="checkbox"][name="termsAlu"]'),

    btnCadastrar: () => cy.contains("button.cta", /Cadastrar/i),

    // Orientador
    inputOriNome: () => cy.get('input[name="ori_nome"]'),

    inputOriCpf: () => cy.get('input[name="ori_cpf"]'),

    inputOriEmail: () => cy.get('input[name="ori_email"]'),

    inputOriSenha: () => cy.get('input[name="ori_senha"]'),

    inputOriConfirmarSenha: () => cy.get('input[name="ori_confirma"]'),

    checkboxTermosOri: () => cy.get('input[type="checkbox"][name="termsOri"]'),
  };

  visitHome() {
    cy.visit("/");
  }

  scrollToCriarConta() {
    this.elements.btnCriarConta().scrollIntoView();
  }

  closeOverlayIfOpen() {
    cy.get("body").then(($body) => {
      if ($body.find(".cdk-overlay-backdrop").length) {
        cy.get("body").type("{esc}");
        cy.get(".cdk-overlay-backdrop").should("not.exist");
      }
    });
  }

  clickCriarConta() {
    this.elements.btnCriarConta().should("be.visible").click();
  }

  selecionarAluno() {
    this.elements.btnSouAluno().should("be.visible").click();
  }

  selecionarOrientador() {
    this.elements.btnSouOrientador().should("be.visible").click();
  }

  setNome(nome) {
    this.elements.inputNome().should("be.visible").clear().type(nome);
  }

  setCpf(cpf) {
    this.elements.inputCpf().should("be.visible").clear().type(cpf);
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

  setConfirmarSenha(senha) {
    this.elements
      .inputConfirmarSenha()
      .should("be.visible")
      .clear()
      .type(senha, { log: false });
  }

  clickProximo() {
    this.elements.btnProximo().should("be.visible").and("be.enabled").click();
  }

  openCurso() {
    this.closeOverlayIfOpen();
    this.elements.selectCurso().should("be.visible").click();
  }

  chooseCurso(curso) {
    this.openCurso();
    this.elements.optionByText(curso).should("be.visible").click();
    cy.get(".cdk-overlay-backdrop").should("not.exist");
  }

  openCampus() {
    this.closeOverlayIfOpen();
    this.elements.selectCampus().should("be.visible").click();
  }

  chooseCampus(campus) {
    this.openCampus();
    this.elements.optionByText(campus).should("be.visible").click();
    cy.get(".cdk-overlay-backdrop").should("not.exist");
  }

  assertProximoDesabilitado() {
    this.elements.btnProximo().should("be.disabled");
  }

  assertProximoHabilitado() {
    this.elements.btnProximo().should("be.enabled");
  }

  clickVoltar() {
    this.elements.btnVoltar().should("be.visible").click();
  }

  uploadNotasPdf() {
    this.elements
      .inputNotasPdf()
      .should("exist")
      .selectFile("cypress/support/static/pdf.pdf", { force: true });
  }

  selecionarTrabalhoRemunerado() {
    this.elements
      .alunoTrabalhaSimLabel()
      .find('input[type="radio"]')
      .check({ force: true });
  }

  selecionarSemTrabalhoRemunerado() {
    this.elements
      .alunoTrabalhaNaoLabel()
      .find('input[type="radio"]')
      .check({ force: true });
  }

  aceitarTermosFinal() {
    this.elements
      .checkboxTermosFinal()
      .should("be.enabled")
      .check({ force: true });
  }

  assertCadastrarDesabilitado() {
    this.elements.btnCadastrar().should("be.disabled");
  }

  assertCadastrarHabilitado() {
    this.elements.btnCadastrar().should("be.enabled");
  }

  clickCadastrar() {
    this.elements.btnCadastrar().should("be.visible").and("be.enabled").click();
  }

  setOriNome(nome) {
    this.elements.inputOriNome().should("be.visible").clear().type(nome);
  }

  setOriCpf(cpf) {
    this.elements.inputOriCpf().should("be.visible").clear().type(cpf);
  }

  setOriEmail(email) {
    this.elements.inputOriEmail().should("be.visible").clear().type(email);
  }

  setOriSenha(senha) {
    this.elements
      .inputOriSenha()
      .should("be.visible")
      .clear()
      .type(senha, { log: false });
  }

  setOriConfirmarSenha(senha) {
    this.elements
      .inputOriConfirmarSenha()
      .should("be.visible")
      .clear()
      .type(senha, { log: false });
  }

  aceitarTermosOri() {
    this.elements
      .checkboxTermosOri()
      .should("be.enabled")
      .check({ force: true });
  }
}

export default RegistrationPage;
