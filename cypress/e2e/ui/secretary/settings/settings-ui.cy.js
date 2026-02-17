import SecretariaConfiguracoesPage from "../../../../support/pages/secretaria/settings/settingsPage";
import { generateCPF } from "../../../../support/helpers/cpfGenerate";

describe("Secretaria - Configurações (Campus)", () => {
  const page = new SecretariaConfiguracoesPage();
  const cpf = generateCPF();

  beforeEach(() => {
    cy.loginSecretariaUi();
  });

  it("Cenário 1 - Acessar tela de configurações pelo menu", () => {
    page.visitMenu();
  });

  it("Cenário 2 - Cadastrar um campus", () => {
    cy.intercept("GET", "**/api/campus/**").as("getCampus");
    cy.intercept("POST", "**/api/campus/**").as("postCampus");

    page.visitMenu();
    cy.wait("@getCampus");

    const campus = `Campus Cypress ${Date.now()}`;
    page.setNomeCampus(campus);
    page.clickSalvar();

    cy.wait("@postCampus");
    cy.wait("@getCampus");

    page.assertCampusNaLista(campus);
  });

  it("Cenário 3 - Excluir um campus", () => {
    cy.intercept("GET", "**/api/campus/**").as("getCampus");
    cy.intercept("DELETE", "**/api/campus/**").as("deleteCampus");

    page.visitMenu();
    cy.wait("@getCampus");

    const campus = `Campus Delete ${Date.now()}`;
    cy.intercept("POST", "**/api/campus/**").as("postCampus");
    page.setNomeCampus(campus);
    page.clickSalvar();
    cy.wait("@postCampus");
    cy.wait("@getCampus");

    page.excluirEConfirmarCampus(campus);

    cy.wait("@deleteCampus");
    cy.wait("@getCampus");

    page.assertCampusNaoEstaNaLista(campus);
  });

  it("Cenário 4 - Cadastrar um curso", () => {
    cy.intercept("GET", "**/api/cursos/**").as("getCursos");
    cy.intercept("POST", "**/api/cursos/**").as("postCurso");

    page.visitMenu();
    page.clickAba("Cursos");

    cy.wait("@getCursos");

    const curso = `Curso Cypress ${Date.now()}`;
    page.setNomeCurso(curso);
    page.clickSalvarCurso();

    cy.wait("@postCurso");
    cy.wait("@getCursos");

    page.assertCursoNaLista(curso);
  });

  it("Cenário 5 - Excluir um curso", () => {
    cy.intercept("GET", "**/api/cursos/**").as("getCursos");
    cy.intercept("POST", "**/api/cursos/**").as("postCurso");
    cy.intercept("DELETE", "**/api/cursos/**").as("deleteCurso");

    page.visitMenu();
    page.clickAba("Cursos");

    cy.wait("@getCursos");

    const curso = `Curso Delete ${Date.now()}`;
    page.setNomeCurso(curso);
    page.clickSalvarCurso();

    cy.wait("@postCurso");
    cy.wait("@getCursos");

    page.excluirEConfirmarCurso(curso);

    cy.wait("@deleteCurso");
    cy.wait("@getCursos");

    page.assertCursoNaoEstaNaLista(curso);
  });

  it("Cenário 6 - Cadastrar tipo de bolsa", () => {
    cy.intercept("GET", "**/api/**").as("getBolsas");
    cy.intercept("POST", "**/api/**").as("postBolsa");

    page.visitMenu();
    page.clickAbaBolsas();

    const tipo = `PIBIC Cypress ${Date.now()}`;
    page.setTipoBolsa(tipo);
    page.clickSalvarTipoBolsa();

    cy.wait("@postBolsa");
    cy.wait("@getBolsas");

    page.assertTipoBolsaNaLista(tipo);
  });

  it("Cenário 7 - Vincular bolsa ao aluno", () => {
    cy.intercept("GET", "**/api/**").as("getBolsas");
    page.visitMenu();
    page.clickAbaBolsas();
    page.setFiltroBolsa("felipe");
    page.clickVincularBolsaPorEmail("felipe.moreira@uscsonline.com.br");
    page.chooseTipoBolsaNoModal("Cypress");
    page.clickSalvarVinculoNoModal();
  });

  it("Cenário 8 - Excluir tipo de bolsa", () => {
    cy.intercept("GET", "**/api/**").as("getBolsas");
    cy.intercept("POST", "**/api/**").as("postBolsa");
    cy.intercept("DELETE", "**/api/**").as("deleteBolsa");

    page.visitMenu();
    page.clickAbaBolsas();

    const tipo = `Bolsa Delete ${Date.now()}`;
    page.setTipoBolsa(tipo);
    page.clickSalvarTipoBolsa();

    cy.wait("@postBolsa");
    cy.wait("@getBolsas");

    page.excluirEConfirmarTipoBolsa(tipo);

    cy.wait("@deleteBolsa");
    cy.wait("@getBolsas");

    page.assertTipoBolsaNaoEstaNaLista(tipo);
  });

  it("Cenário 9 - Desvincular bolsa de aluno", () => {
    cy.intercept("GET", "**/api/**").as("getBolsas");
    page.visitMenu();
    page.clickAbaBolsas();
    page.setFiltroBolsa("felipe");
    page.assertAlunoComBolsaTag("felipe.moreira@uscsonline.com.br", "Cypress");
    page.clickDesvincularBolsaPorEmail(
      "felipe.moreira@uscsonline.com.br",
      "Cypress",
    );
    page.confirmarExclusao();
    page.assertAlunoNaoTemBolsaTag(
      "felipe.moreira@uscsonline.com.br",
      "Cypress",
    );
  });

  it("Cenário 10 - Acessar aba Secretarias", () => {
    page.visitMenu();
    page.clickAbaSecretarias();
    page.nomeSecretaria("Secretaria Teste");
    page.emailSecretaria("secretaria.teste23@gmail.com");
    page.cpfSecretaria(cpf);
    page.senhaSecretaria("123456");
    page.confirmarSenhaSecretaria("123456");
    cy.intercept("POST", /\/api\/secretarias\/?$/).as("postSecretarias");
    cy.intercept("GET", /\/api\/secretarias(\/.*)?$/).as("getSecretarias");

    page.clickSalvarSecretaria();
    cy.wait("@postSecretarias");
    page.clickOkModalSucesso(); 
  });

  it("Cenário - Resetar senha de secretária", () => {
    page.visitMenu();
    page.clickAbaSecretarias();

    page.resetarSenhaSecretariaPorEmail("admin.secretaria@facul.br");
  });
});
