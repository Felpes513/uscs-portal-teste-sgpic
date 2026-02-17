import SecretariaAvaliadoresPage from "../../../../support/pages/secretaria/avaliator/avaliatorPage";

describe("Secretaria - Avaliadores Externos", () => {
  const page = new SecretariaAvaliadoresPage();

  beforeEach(() => {
    cy.loginSecretariaUi();
  });

  it("Cenário 1 - Acessar tela de avaliadores pelo menu", () => {
    page.visitMenu();
    page.clickNovoAvaliador();
    page.chooseTipoAvaliador("Externo");
    page.setNome("Avaliador Externo");
    page.setEmail("felipesouzamoreira2003@gmail.com");
    page.setEspecialidade("Engenharia de Software");
    page.setSubespecialidade("Testes de Software");
    page.setLattes("https://lattes.cnpq.br/1234567890123456");
    page.clickCadastrar();
  });

  it("Cenário 2 - Acessar tela de avaliadores e validar campos", () => {
    page.visitMenu();

    page.assertAvaliadorNaTabela({
      nome: "Avaliador Externo",
      email: "felipesouzamoreira2003@gmail.com",
      especialidade: "Engenharia de Software",
      subespecialidade: "Testes de Software",
    });

    page.assertLinkLattes({
      email: "felipesouzamoreira2003@gmail.com",
      lattesUrl: "https://lattes.cnpq.br/1234567890123456",
    });

    page.clickEditar("felipesouzamoreira2003@gmail.com");
  });

  it("Cenário 3 - Enviar avaliação para avaliador externo", () => {
    page.visitMenu();

    page.clickEnviarAvaliacao();
    page.chooseProjeto("Projeto Automacao 1770944750860");
    page.marcarAvaliadorPorTexto("felipesouzamoreira2003@gmail.com");

    page.setAssunto("USCS • Solicitação de Avaliação — Teste Cypress");
    page.setMensagem("Olá! Envio automatizado de avaliação via Cypress.");

    page.clickEnviarNoModal();
  });

  it("Cenário 4 - Editar avaliador externo", () => {
    page.visitMenu();
    page.clickEditar("felipesouzamoreira2003@gmail.com");
    page.chooseTipoAvaliador("Externo");
    page.setNome("Avaliador Externo Editado");
    page.setEmail("felipesouzamoreira2003@gmail.com");
    page.setEspecialidade("Engenharia de Software Editada");
    page.setSubespecialidade("Testes de Software Editado");
    page.setLattes("https://lattes.cnpq.br/1234567890123456editado");
    page.clickCadastrar();
  });

  it("Cenário 5 - Acessar tela de avaliadores e abrir projetos recebidos", () => {
    page.visitMenu();

    page.assertAvaliadorNaTabela({
      nome: "Avaliador Externo Editado",
      email: "felipesouzamoreira2003@gmail.com",
      especialidade: "Engenharia de Software Editada",
      subespecialidade: "Testes de Software Editado",
    });

    page.assertLinkLattes({
      email: "felipesouzamoreira2003@gmail.com",
      lattesUrl: "https://lattes.cnpq.br/1234567890123456editado",
    });

    page.clickVerEnvios("felipesouzamoreira2003@gmail.com");
  });

  it("Cenário 6 - Acessar tela de avaliadores e excluir um avaliador", () => {
    page.visitMenu();
    page.clickExcluir("felipesouzamoreira2003@gmail.com");
  });
});
