import { loginSecretariaUi } from "../../../../support/helpers/login";
import SecretaryNotificationsPage from "../../../../support/pages/secretary/notifications/notificationsPage";

describe("UI - Fluxos da Secretaria (Notificações)", () => {
  const page = new SecretaryNotificationsPage();

  beforeEach(() => {
    loginSecretariaUi();
  });

  it("Cenário 1 - Acessar a tela de notificações", () => {
    page.goToNotificacoes();
    page.assertOnNotificacoesPage();
  });

  it('Cenário 2 - Ao clicar "Cancelar" na confirmação, NÃO deve chamar PUT mark-all', () => {
    page.goToNotificacoes();
    page.assertOnNotificacoesPage();

    page.cancelarLerTodasEValidarSemRequest();
  });

  it('Cenário 3 - Ao clicar "OK" na confirmação, deve chamar PUT mark-all', () => {
    page.goToNotificacoes();
    page.assertOnNotificacoesPage();

    page.confirmarLerTodas();
  });

  it("Cenário 4 - Abrir uma notificação e fechar o modal", () => {
    page.goToNotificacoes();
    page.assertOnNotificacoesPage();

    page.abrirPrimeiraNotificacao();
    page.fecharModalNotificacao();
  });
});
