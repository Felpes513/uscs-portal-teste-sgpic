import { loginAlunoUi } from "../../../support/helpers/login";
import StudentPage from "../../../support/pages/student/studentPage";

describe("UI - Fluxos do Aluno (Detalhe do Projeto)", () => {
  const page = new StudentPage();

  beforeEach(() => {
    loginAlunoUi();
    page.assertOnListagemProjetos();
    page.openFirstProjeto();
    page.assertOnProjetoDetalhe();
  });

  it("Deve ser apenas visualização (sem edição) e permitir downloads conforme status", () => {
    page.assertReadOnlyForm();

    // rola até a seção de histórico / final
    page.scrollToBottom();

    // FASE 1 - Submissão (Ideia) => no seu exemplo está Enviado (habilitado)
    page.handleDownload({
      faseTitulo: "Submissão do Projeto (Ideia)",
      tipo: "PDF",
      enabled: true,
      click: true,
    });

    page.handleDownload({
      faseTitulo: "Submissão do Projeto (Ideia)",
      tipo: "DOCX",
      enabled: true,
      click: true,
    });

    // FASE 2 - Monografia Parcial => no seu exemplo "Não enviado" (disabled)
    page.handleDownload({
      faseTitulo: "Monografia Parcial",
      tipo: "PDF",
      enabled: false,
    });

    page.handleDownload({
      faseTitulo: "Monografia Parcial",
      tipo: "DOCX",
      enabled: false,
    });

    // FASE 3 - Monografia Final => no seu exemplo "Não enviado" (disabled)
    page.handleDownload({
      faseTitulo: "Monografia Final",
      tipo: "PDF",
      enabled: false,
    });

    page.handleDownload({
      faseTitulo: "Monografia Final",
      tipo: "DOCX",
      enabled: false,
    });
  });

  it('Deve voltar para a listagem ao clicar em "Voltar"', () => {
    page.scrollToBottom();
    page.clickVoltar();
  });
});
