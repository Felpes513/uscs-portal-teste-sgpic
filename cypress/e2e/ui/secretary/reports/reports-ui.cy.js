import { loginSecretariaUi } from "../../../../support/helpers/login";
import SecretaryReportsPage from "../../../../support/pages/secretary/reports/reportsPage";

describe("UI - Secretaria - Relatórios Mensais", () => {
  const page = new SecretaryReportsPage();

  beforeEach(() => {
    loginSecretariaUi();
  });

  it("Cenário 1 - Acessar a tela de relatórios", () => {
    page.goToRelatorios();
    page.assertOnRelatoriosMensaisPage();
  });

  it("Cenário 2 - Avançar Mês", () => {
    page.goToRelatorios();
    page.assertOnRelatoriosMensaisPage();
    page.clickProximoMesEValidar();
  });

  it("Cenário 3 - Mês anterior", () => {
    page.goToRelatorios();
    page.assertOnRelatoriosMensaisPage();
    page.clickMesAnteriorEValidar();
  });

  it("Cenário 4 - Acessar relatório e fechar (botão no começo da tela)", () => {
    page.goToRelatorios();
    page.assertOnRelatoriosMensaisPage();

    page.getMesAtual().then((mes) => {
      page.openPrimeiroRelatorioRecebido();
      page.assertNavegouParaRelatorioReadonly();
      page.assertMesNaUrl(mes);

      page.clickFecharTopo();
      page.assertVoltouParaRelatoriosSecretaria();
    });
  });

  it("Cenário 5 - Acessar relatório e fechar (botão no fim da tela)", () => {
    page.goToRelatorios();
    page.assertOnRelatoriosMensaisPage();

    page.getMesAtual().then((mes) => {
      page.openPrimeiroRelatorioRecebido();
      page.assertNavegouParaRelatorioReadonly();
      page.assertMesNaUrl(mes);

      page.clickFecharFinal();
      page.assertVoltouParaRelatoriosSecretaria();
    });
  });
});
