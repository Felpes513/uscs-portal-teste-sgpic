class SecretariaConfiguracoesPage {
  escapeRegex(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  elements = {
    menuConfiguracoes: () =>
      cy.contains(
        'a[routerlink="/secretaria/configuracoes"]',
        /Configurações/i,
      ),
    urlPath: "/secretaria/configuracoes",

    abaByNome: (nomeAba) => {
      const safe = this.escapeRegex(nomeAba);
      return cy
        .contains(
          '[role="tab"], .mat-mdc-tab, .mdc-tab',
          new RegExp(`^\\s*${safe}\\s*$`, "i"),
        )
        .filter(":visible")
        .first();
    },

    abaBolsas: () =>
      cy
        .contains('[role="tab"], .mat-mdc-tab, .mdc-tab', /^Bolsas$/i)
        .filter(":visible")
        .first(),

    inputNomeCampus: () =>
      cy.get('input[name="nomeCampus"]').filter(":visible").last(),

    btnSalvar: () =>
      cy
        .contains('button[type="submit"]', /^Salvar$/i)
        .filter(":visible")
        .last(),

    itemByCampus: (nomeCampus) => {
      const safe = this.escapeRegex(nomeCampus);
      return cy
        .contains("span", new RegExp(`^\\s*${safe}\\s*$`, "i"))
        .filter(":visible")
        .parent();
    },

    inputNomeCurso: () =>
      cy.get('input[name="nomeCurso"]').filter(":visible").last(),

    btnSalvarCurso: () =>
      cy
        .contains('button[type="submit"]', /^Salvar$/i)
        .filter(":visible")
        .last(),

    itemByCurso: (nomeCurso) => {
      const safe = this.escapeRegex(nomeCurso);
      return cy
        .contains("span", new RegExp(`^\\s*${safe}\\s*$`, "i"))
        .filter(":visible")
        .closest("li");
    },

    inputTipoBolsa: () =>
      cy.get('input[name="tipoBolsa"]').filter(":visible").last(),

    btnSalvarTipoBolsa: () =>
      cy
        .contains('button[type="submit"]', /^Salvar$/i)
        .filter(":visible")
        .last(),

    itemByTipoBolsa: (tipo) => {
      const safe = this.escapeRegex(tipo);
      return cy
        .contains("ul.list li span", new RegExp(`^\\s*${safe}\\s*$`, "i"))
        .filter(":visible")
        .closest("li");
    },

    inputFiltroBolsa: () =>
      cy.get('input[name="filtroBolsa"]').filter(":visible").last(),

    tabelaBolsas: () => cy.get("table.table-bolsas").filter(":visible").first(),

    rowAlunoByEmail: (email) => {
      const safe = this.escapeRegex(email);
      return cy
        .get("table.table-bolsas tbody tr")
        .filter(":visible")
        .contains(new RegExp(safe, "i"))
        .closest("tr");
    },

    modalVincularBolsa: () =>
      cy.get("div.modal-backdrop .modal").filter(":visible"),

    tituloModalVincularBolsa: () =>
      cy
        .contains("div.modal-backdrop .modal h3", /^Vincular Bolsa$/i)
        .filter(":visible"),

    selectTipoBolsaNoModal: () =>
      cy.get("mat-select").filter(":visible").last(),

    btnSalvarVinculoNoModal: () =>
      cy
        .contains("button", /Salvar/i)
        .filter(":visible")
        .last(),

    btnCancelarVinculoNoModal: () =>
      cy
        .contains("button", /Cancelar/i)
        .filter(":visible")
        .last(),

    bolsaTagByText: (tipoBolsa) => {
      const safe = this.escapeRegex(tipoBolsa);
      return cy
        .contains("span.tag", new RegExp(`\\b${safe}\\b`, "i"))
        .filter(":visible")
        .first();
    },

    btnRemoverBolsaInTag: (tipoBolsa) =>
      this.elements
        .bolsaTagByText(tipoBolsa)
        .find("button.tag-remove")
        .filter(":visible")
        .first(),

    abaSecretarias: () =>
      cy
        .contains('[role="tab"], .mat-mdc-tab, .mdc-tab', /^Secretarias$/i)
        .filter(":visible")
        .first(),

    inputSecNome: () =>
      cy.get('input[name="sec_nome"]').filter(":visible").last(),
    inputSecEmail: () =>
      cy.get('input[name="sec_email"]').filter(":visible").last(),
    inputSecCpf: () =>
      cy.get('input[name="sec_cpf"]').filter(":visible").last(),
    inputSecSenha: () =>
      cy.get('input[name="sec_senha"]').filter(":visible").last(),
    inputSecConfirmar: () =>
      cy.get('input[name="sec_confirmar"]').filter(":visible").last(),

    btnSalvarSecretaria: () =>
      cy.get('form.sec-form button[type="submit"]').filter(":visible").last(),

    tabelaSecretarias: () =>
      cy.get("table.table-secretarias").filter(":visible").first(),

    rowSecretariaByEmail: (email) => {
      const safe = this.escapeRegex(email);
      return cy
        .get("table.table-secretarias tbody tr")
        .filter(":visible")
        .contains(new RegExp(safe, "i"))
        .closest("tr");
    },

    btnResetSenhaInRow: () =>
      cy
        .contains("button.btn-reset", /Resetar senha/i)
        .filter(":visible")
        .first(),

    abaSecretarias: () =>
      cy
        .contains(
          '[role="tab"], .mat-mdc-tab, .mdc-tab',
          /^\s*Secretarias\s*$/i,
        )
        .filter(":visible")
        .first(),

    inputSecNome: () =>
      cy.get('input[name="sec_nome"]').filter(":visible").last(),

    inputSecEmail: () =>
      cy.get('input[name="sec_email"]').filter(":visible").last(),

    inputSecCpf: () =>
      cy.get('input[name="sec_cpf"]').filter(":visible").last(),

    inputSecSenha: () =>
      cy.get('input[name="sec_senha"]').filter(":visible").last(),

    inputSecConfirmar: () =>
      cy.get('input[name="sec_confirmar"]').filter(":visible").last(),

    btnSalvarSecretaria: () =>
      cy
        .contains('form.sec-form button[type="submit"]', /^\s*Salvar\s*$/i)
        .filter(":visible")
        .last(),

    btnOkModalSucesso: () =>
      cy
        .contains("button.btn.btn-primary", /^\s*OK\s*$/i)
        .filter(":visible")
        .last(),

    tabelaSecretarias: () =>
      cy.get("table.table-secretarias").filter(":visible").first(),

    rowSecretariaByEmail: (email) => {
      const safe = this.escapeRegex(email);
      return cy
        .get("table.table-secretarias tbody tr")
        .filter(":visible")
        .contains(new RegExp(safe, "i"))
        .closest("tr");
    },

    btnResetarSenhaByEmail: (email) =>
      this.elements
        .rowSecretariaByEmail(email)
        .find("button.btn-reset")
        .filter(":visible"),

    dialogActions: () => cy.get("div.dialog-actions").filter(":visible"),

    btnDialogOkDentroActions: () =>
      cy
        .contains("div.dialog-actions button.btn.btn-primary", /^\s*OK\s*$/i)
        .filter(":visible")
        .last(),

    btnDialogCancelarDentroActions: () =>
      cy
        .contains("div.dialog-actions button.btn.btn-secondary", /Cancelar/i)
        .filter(":visible")
        .last(),

    btnDialogOkUnico: () =>
      cy
        .contains("button.btn.btn-primary", /^\s*OK\s*$/i)
        .filter(":visible")
        .last(),
  };

  visitMenu() {
    this.elements.menuConfiguracoes().should("be.visible").click();
    cy.location("pathname").should("eq", this.elements.urlPath);
    cy.window().then((win) => win.scrollTo(0, 0));
  }

  clickAba(nomeAba) {
    this.elements.abaByNome(nomeAba).should("be.visible").click();
  }

  clickAbaBolsas() {
    this.elements.abaBolsas().should("be.visible").click();
  }

  setNomeCampus(nome) {
    this.elements.inputNomeCampus().should("be.visible").clear().type(nome);
  }

  clickSalvar() {
    this.elements
      .btnSalvar()
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  }

  assertCampusNaLista(nomeCampus) {
    this.elements.itemByCampus(nomeCampus).should("be.visible");
  }

  assertCampusNaoEstaNaLista(nomeCampus) {
    const safe = this.escapeRegex(nomeCampus);
    cy.contains("span", new RegExp(`^\\s*${safe}\\s*$`, "i")).should(
      "not.exist",
    );
  }

  clickExcluirCampus(nomeCampus) {
    const safe = this.escapeRegex(nomeCampus);

    cy.contains("span", new RegExp(`^\\s*${safe}\\s*$`, "i"))
      .filter(":visible")
      .parent()
      .within(() => {
        cy.get("button")
          .contains(/Excluir/i)
          .should("be.visible")
          .click();
      });
  }

  confirmarExclusao() {
    cy.contains(/Confirmação/i).should("be.visible");

    cy.get("button")
      .contains(/^\s*OK\s*$/i)
      .filter(":visible")
      .should("not.be.disabled")
      .click();

    cy.contains(/Confirmação/i, { timeout: 10000 }).should("not.exist");
  }

  cancelarExclusao() {
    cy.contains(/Confirmação/i).should("be.visible");

    cy.get("button")
      .contains(/Cancelar/i)
      .filter(":visible")
      .click();

    cy.contains(/Confirmação/i).should("not.exist");
  }

  excluirEConfirmarCampus(nomeCampus) {
    this.clickExcluirCampus(nomeCampus);
    this.confirmarExclusao();
  }

  setNomeCurso(nome) {
    this.elements.inputNomeCurso().should("be.visible").clear().type(nome);
  }

  clickSalvarCurso() {
    this.elements
      .btnSalvarCurso()
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  }

  assertCursoNaLista(nomeCurso) {
    this.elements.itemByCurso(nomeCurso).should("be.visible");
  }

  assertCursoNaoEstaNaLista(nomeCurso) {
    const safe = this.escapeRegex(nomeCurso);
    cy.contains("span", new RegExp(`^\\s*${safe}\\s*$`, "i")).should(
      "not.exist",
    );
  }

  clickExcluirCurso(nomeCurso) {
    this.elements.itemByCurso(nomeCurso).within(() => {
      cy.contains("button", /Excluir/i)
        .should("be.visible")
        .click();
    });
  }

  excluirEConfirmarCurso(nomeCurso) {
    this.clickExcluirCurso(nomeCurso);
    this.confirmarExclusao();
  }

  setTipoBolsa(tipo) {
    this.elements.inputTipoBolsa().should("be.visible").clear().type(tipo);
  }

  clickSalvarTipoBolsa() {
    this.elements
      .btnSalvarTipoBolsa()
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  }

  assertTipoBolsaNaLista(tipo) {
    this.elements.itemByTipoBolsa(tipo).should("be.visible");
  }

  assertTipoBolsaNaoEstaNaLista(tipo) {
    const safe = this.escapeRegex(tipo);
    cy.contains("ul.list li span", new RegExp(`^\\s*${safe}\\s*$`, "i")).should(
      "not.exist",
    );
  }

  clickExcluirTipoBolsa(tipo) {
    this.elements.itemByTipoBolsa(tipo).within(() => {
      cy.contains("button", /Excluir/i)
        .should("be.visible")
        .click();
    });
  }

  excluirEConfirmarTipoBolsa(tipo) {
    this.clickExcluirTipoBolsa(tipo);
    this.confirmarExclusao();
  }

  setFiltroBolsa(txt) {
    this.elements.inputFiltroBolsa().should("be.visible").clear().type(txt);
  }

  assertAlunoSemBolsa(email) {
    this.elements
      .rowAlunoByEmail(email)
      .should("be.visible")
      .within(() => {
        cy.contains("span.muted", /Nenhuma bolsa/i).should("be.visible");
      });
  }

  assertAlunoComBolsa(email, tipoBolsa) {
    const safe = this.escapeRegex(tipoBolsa);
    this.elements
      .rowAlunoByEmail(email)
      .should("be.visible")
      .within(() => {
        cy.contains("span.muted", /Nenhuma bolsa/i).should("not.exist");
        cy.contains(new RegExp(`\\b${safe}\\b`, "i")).should("be.visible");
      });
  }

  clickVincularBolsaPorEmail(email) {
    this.elements
      .rowAlunoByEmail(email)
      .should("be.visible")
      .within(() => {
        cy.contains("button", /Vincular Bolsa/i)
          .should("be.visible")
          .click();
      });

    cy.contains("h3", /Vincular Bolsa/i)
      .should("be.visible")
      .scrollIntoView();
  }

  assertModalVincularBolsaAberto() {
    cy.contains("h3", /Vincular Bolsa/i).should("be.visible");
    cy.contains(/Aluno:/).should("be.visible");
  }

  chooseTipoBolsaNoModal(tipo) {
    cy.contains("label", /Selecionar tipo de bolsa/i)
      .scrollIntoView()
      .should("be.visible");

    cy.get("mat-select[name='tiposBolsaSelect']").filter(":visible").click();

    cy.get(".cdk-overlay-container .cdk-overlay-pane")
      .filter(":visible")
      .last()
      .within(() => {
        cy.contains("mat-option", tipo)
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
      });

    cy.get(".cdk-overlay-backdrop", { timeout: 10000 }).should("not.exist");
  }

  clickSalvarVinculoNoModal() {
    cy.contains(".modal-actions button", /Salvar/i)
      .scrollIntoView()
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.contains("h3", /Vincular Bolsa/i, { timeout: 10000 }).should(
      "not.exist",
    );
  }

  clickCancelarVinculoNoModal() {
    cy.contains(".modal-actions button", /Cancelar/i)
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.contains("h3", /Vincular Bolsa/i).should("not.exist");
  }

  assertAlunoComBolsaTag(email, tipoBolsa) {
    const safe = this.escapeRegex(tipoBolsa);

    this.elements
      .rowAlunoByEmail(email)
      .should("be.visible")
      .within(() => {
        cy.contains("span.muted", /Nenhuma bolsa/i).should("not.exist");
        cy.contains("span.tag", new RegExp(`\\b${safe}\\b`, "i")).should(
          "be.visible",
        );
      });
  }

  clickDesvincularBolsaPorEmail(email, tipoBolsa) {
    this.elements
      .rowAlunoByEmail(email)
      .should("be.visible")
      .within(() => {
        const safe = this.escapeRegex(tipoBolsa);

        cy.contains("span.tag", new RegExp(`\\b${safe}\\b`, "i"))
          .should("be.visible")
          .within(() => {
            cy.get("button.tag-remove")
              .should("be.visible")
              .and("not.be.disabled")
              .click({ force: true });
          });
      });
  }

  assertAlunoNaoTemBolsaTag(email, tipoBolsa) {
    const safe = this.escapeRegex(tipoBolsa);

    this.elements
      .rowAlunoByEmail(email)
      .should("be.visible")
      .within(() => {
        cy.contains("span.tag", new RegExp(`\\b${safe}\\b`, "i")).should(
          "not.exist",
        );
      });
  }

  clickAbaSecretarias() {
    this.elements.abaSecretarias().should("be.visible").click();
  }

  nomeSecretaria(nome) {
    this.elements.inputSecNome().should("be.visible").clear().type(nome);
  }

  emailSecretaria(email) {
    this.elements.inputSecEmail().should("be.visible").clear().type(email);
  }

  cpfSecretaria(cpf) {
    this.elements.inputSecCpf().should("be.visible").clear().type(cpf);
  }

  senhaSecretaria(senha) {
    this.elements.inputSecSenha().should("be.visible").clear().type(senha);
  }

  confirmarSenhaSecretaria(senha) {
    this.elements.inputSecConfirmar().should("be.visible").clear().type(senha);
  }

  clickSalvarSecretaria() {
    this.elements
      .btnSalvarSecretaria()
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  }

  clickOkModalSucesso() {
    this.elements
      .btnOkModalSucesso()
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.contains("button.btn.btn-primary", /^\s*OK\s*$/i)
      .filter(":visible")
      .should("have.length", 0);
  }

  clickOkModalSucesso() {
    this.elements
      .btnDialogOkUnico()
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.contains("button.btn.btn-primary", /^\s*OK\s*$/i)
      .filter(":visible")
      .should("have.length", 0);
  }

  resetarSenhaSecretariaPorEmail(email) {
    this.elements
      .btnResetarSenhaByEmail(email)
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    this.elements.dialogActions().should("be.visible");
    this.elements
      .btnDialogOkDentroActions()
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.contains(/Sucesso/i, { timeout: 10000 }).should("be.visible");
    this.clickOkModalSucesso();
  }
}

export default SecretariaConfiguracoesPage;
