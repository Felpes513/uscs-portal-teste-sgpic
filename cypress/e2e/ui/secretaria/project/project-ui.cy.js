import SecretariaProjetosPage from "../../../../support/pages/secretaria/project/projectPage";
import { generateProjectCode } from "../../../../support/helpers/codProject";
import { generateProjectName } from "../../../../support/helpers/nameProject";
import { generateProjectSummary } from "../../../../support/helpers/summaryProject";

describe("Secretaria - Projetos", () => {
  const page = new SecretariaProjetosPage();
  const cod = generateProjectCode();
  const title = generateProjectName();
  const summary = generateProjectSummary();

  beforeEach(() => {
    cy.loginSecretariaUi();
  });

  it("Cenário 1 - Acessar tela de projetos e criar projeto", () => {
    page.visit();
    page.clickNovoProjeto();
    page.setCodigo(cod);
    page.setTitulo(title);
    page.setResumo(summary);
    page.chooseOrientador("Orientador Teste");
    page.chooseCampus("Centro");
    page.uploadDocxIdeia();
    page.uploadPdfIdeia();
    page.clickCadastrarProjeto();
  });

  it("Cenário 2 - Filtrar por projetos", () => {
    page.visit();
    page.clickRecarregar();
  });

  it("Cenário 3 - Filtrar projeto", () => {
    page.visit();
    page.buscar("Projeto Automacao 1770942972138");
  });

  it("Cenário 4 - Filtrar todos os projetos", () => {
    page.visit();
    page.clickFiltroTodos();
  });

  it("Cenário 5 - Filtrar por projetos em execução", () => {
    page.visit();
    page.clickFiltroEmExecucao();
  });

  it("Cenário 6 - Filtrar por projetos concluidos", () => {
    page.visit();
    page.clickFiltroConcluidos();
  });

  it("Cenário 7 - Filtrar por projetos cancelados", () => {
    page.visit();
    page.clickFiltroCancelados();
  });
});
