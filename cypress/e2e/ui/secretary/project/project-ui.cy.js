import SecretariaProjetosPage from "../../../../support/pages/secretary/project/projectPage";
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

  it("Cenário 5 - Cancelar projeto e filtrar por projetos cancelados", () => {
    page.visit();
    page.clickFiltroTodos();

    page.interceptCancelarProjeto();
    page.abrirModalCancelarProjeto();
    page.modalClickOk_comRequest("@putCancelarProjeto", [200, 204]);

    page.clickFiltroCancelados();
  });

  it("Cenário 6 - Acessar projetos cancelados e ativar projeto", () => {
    page.visit();
    page.clickFiltroCancelados();

    page.interceptAtivarProjeto();
    page.abrirModalAtivarProjeto();
    page.modalClickOk_comRequest("@putAtivarProjeto", [200, 204]);
  });

  it("Cenário 7 - Concluir projetos e filtrar por projetos concluidos", () => {
    page.visit();
    page.clickFiltroTodos();

    page.interceptConcluirProjeto();
    page.abrirModalConcluirProjeto();
    page.modalClickOk_comRequest("@putConcluirProjeto", [200, 204]);

    page.clickFiltroConcluidos();
  });

  it("Cenário 8 - Acessar projetos concluidos e ativar projetos", () => {
    page.visit();
    page.clickFiltroConcluidos();

    page.interceptAtivarProjeto();
    page.abrirModalAtivarProjeto();
    page.modalClickOk_comRequest("@putAtivarProjeto", [200, 204]);
  });

  it("Cenário 9 - Filtrar por projetos em execução", () => {
    page.visit();
    page.clickFiltroEmExecucao();
  });

  it('Extra - Cancelar modal: ao clicar "Cancelar", NÃO chama PUT cancelar', () => {
    page.visit();
    page.clickFiltroTodos();

    page.interceptCancelarProjeto();
    page.abrirModalCancelarProjeto();
    page.modalClickCancelar_semRequest("@putCancelarProjeto");
  });

  it('Extra - Ativar modal: ao clicar "Cancelar", NÃO chama PUT ativar', () => {
    page.visit();
    page.clickFiltroCancelados();

    page.interceptAtivarProjeto();
    page.abrirModalAtivarProjeto();
    page.modalClickCancelar_semRequest("@putAtivarProjeto");
  });

  it('Extra - Concluir modal: ao clicar "Cancelar", NÃO chama PUT concluir', () => {
    page.visit();
    page.clickFiltroTodos();

    page.interceptConcluirProjeto();
    page.abrirModalConcluirProjeto();
    page.modalClickCancelar_semRequest("@putConcluirProjeto");
  });
});
