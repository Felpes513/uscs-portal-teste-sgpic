import { loginOrientadorUi } from "../../../../support/helpers/login";
import OrientadorPage from "../../../../support/pages/advisor/reports/reportsPage";

describe("UI - Fluxos do Orientador (Relatórios)", () => {
  const page = new OrientadorPage();

  beforeEach(() => {
    loginOrientadorUi();
  });

  it("Deve abrir a página de Relatórios do primeiro projeto", () => {
    page.assertOnListagemProjetosOrientador();
    page.openRelatoriosDoPrimeiroProjeto();
    page.assertOnRelatoriosPage();
  });

  it('Deve preencher o relatório e clicar em "Fechar"', () => {
    page.assertOnListagemProjetosOrientador();
    page.openRelatoriosDoPrimeiroProjeto();
    page.assertOnRelatoriosPage();

    page.preencherFormularioRelatorio({
      referenciaMes: "2026-02",
      resumo: "Resumo do mês (teste automatizado).",
      atividades: "Atividade 1; Atividade 2.",
      bloqueios: "Sem bloqueios.",
      proximosPassos: "Próximo passo X.",
      horas: 10,
      marcarOk: true,
    });

    page.clicarFechar();

    cy.location("pathname", { timeout: 10000 }).should(
      "include",
      "/orientador",
    );
  });

  it("Deve confirmar relatório mensal (POST /api/:id/relatorios-mensais/confirmar)", () => {
    page.assertOnListagemProjetosOrientador();
    page.openRelatoriosDoPrimeiroProjeto();
    page.assertOnRelatoriosPage();

    page.preencherFormularioRelatorio({
      referenciaMes: "2026-02",
      resumo: "Resumo do mês (teste automatizado).",
      atividades: "Atividade 1; Atividade 2.",
      bloqueios: "Sem bloqueios.",
      proximosPassos: "Próximo passo X.",
      horas: 10,
      marcarOk: true,
    });

    page.confirmarRelatorioMensal();
  });
});
