import { loginAlunoUi } from "../../../support/helpers/login";
import StudentPage from "../../../support/pages/student/studentPage";

describe("UI - Fluxos do Aluno", () => {
  const page = new StudentPage();

  beforeEach(() => {
    loginAlunoUi();
  });

  it("Deve realizar todos os downloads (PDF e DOCX) das 3 fases", () => {
    page.assertOnListagemProjetos();

    page.openFirstProjeto();
    page.assertOnProjetoDetalhe();
    page.scrollContainerToTop();

    page.downloadByFase({
      faseTitulo: "Submissão do Projeto (Ideia)",
      tipo: "PDF",
    });
    page.downloadByFase({
      faseTitulo: "Submissão do Projeto (Ideia)",
      tipo: "DOCX",
    });

    page.downloadByFase({ faseTitulo: "Monografia Parcial", tipo: "PDF" });
    page.downloadByFase({ faseTitulo: "Monografia Parcial", tipo: "DOCX" });

    page.downloadByFase({ faseTitulo: "Monografia Final", tipo: "PDF" });
    page.downloadByFase({ faseTitulo: "Monografia Final", tipo: "DOCX" });
  });

  it('Deve voltar para a listagem ao clicar em "Voltar"', () => {
    page.assertOnListagemProjetos();

    page.openFirstProjeto();
    page.assertOnProjetoDetalhe();
    page.scrollContainerToTop();

    page.scrollToBottom();
    page.clickVoltar();

    page.assertOnListagemProjetos();
  });

  it('Ao clicar "Cancelar" na confirmação, NÃO deve inscrever nem disparar requisição', () => {
    page.assertOnListagemProjetos();
    page.inscreverNoPrimeiroProjetoDaListagem_Cancelar();
  });

  it('Ao clicar "OK" na confirmação, deve inscrever e trocar botão para "Inscrito"', () => {
    page.assertOnListagemProjetos();
    page.inscreverNoPrimeiroProjetoDaListagem_OK();
  });
});
