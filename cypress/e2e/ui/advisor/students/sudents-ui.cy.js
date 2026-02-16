import { loginOrientadorUi } from "../../../../support/helpers/login";
import SelectStudentsPage from "../../../../support/pages/advisor/students/studentsPage";

describe("UI - Fluxos do Orientador (Selecionar Alunos)", () => {
  const page = new SelectStudentsPage();

  beforeEach(() => {
    loginOrientadorUi();
  });

  it("Deve abrir a tela de Selecionar Alunos do primeiro projeto", () => {
    page.assertOnListagemProjetosOrientador();
    page.openSelecionarAlunosDoPrimeiroProjeto();
    page.assertOnSelecionarAlunosPage();
    page.scrollContainerToTop();
  });

  it("Deve manter os dados do projeto somente leitura", () => {
    page.assertOnListagemProjetosOrientador();
    page.openSelecionarAlunosDoPrimeiroProjeto();
    page.assertOnSelecionarAlunosPage();

    page.assertProjetoReadOnly();
  });

  it("Deve permitir selecionar até 4 alunos (não pode passar do limite)", () => {
    page.assertOnListagemProjetosOrientador();
    page.openSelecionarAlunosDoPrimeiroProjeto();
    page.assertOnSelecionarAlunosPage();

    page.assertContadorSelecionados({ selecionados: 0, limite: 4 });
    page.naoDevePermitirMaisQue4();
  });

  it("Deve salvar a seleção de alunos", () => {
    page.assertOnListagemProjetosOrientador();
    page.openSelecionarAlunosDoPrimeiroProjeto();
    page.assertOnSelecionarAlunosPage();

    page.selecionarPrimeirosNDisponiveis(2);
    page.assertContadorSelecionados({ selecionados: 2, limite: 4 });

    page.salvarSelecaoComIntercept();
  });

  it('Deve voltar para listagem ao clicar em "Voltar"', () => {
    page.assertOnListagemProjetosOrientador();
    page.openSelecionarAlunosDoPrimeiroProjeto();
    page.assertOnSelecionarAlunosPage();

    page.scrollContainerToBottom();
    page.clickVoltar();
    page.assertOnListagemProjetosOrientador();
  });
});
