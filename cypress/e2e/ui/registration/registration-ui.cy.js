import RegistrationPage from "../../../support/pages/registration/registrationPage";
import { generateCPF } from "../../../support/helpers/cpfGenerate";

describe("Cadastro - Seleção de perfil", () => {
  const page = new RegistrationPage();
  const cpf = generateCPF();

  it("Deve se cadastrar como aluno", () => {
    page.visitHome();
    page.scrollToCriarConta();
    page.clickCriarConta();
    page.selecionarAluno();

    cy.location("pathname").should("include", "/cadastro");

    page.setNome("Felipe Souza Moreira");
    page.setCpf(cpf);
    page.setEmail("felipe.moreira@uscsonline.com.br");
    page.setSenha("123456");
    page.setConfirmarSenha("123456");
    page.clickProximo();
    page.chooseCurso("Medicina");
    page.chooseCampus("Centro");
    page.assertProximoHabilitado();
    page.clickProximo();
    page.assertCadastrarDesabilitado();
    page.uploadNotasPdf();
    page.selecionarSemTrabalhoRemunerado();
    page.aceitarTermosFinal();
    page.assertCadastrarHabilitado();
    page.clickCadastrar();
  });

  it("Deve se cadastrar como orientador", () => {
    page.visitHome();
    page.scrollToCriarConta();
    page.clickCriarConta();
    page.selecionarOrientador();
    
    cy.location("pathname").should("include", "/cadastro");

    page.setOriNome("Orientador Teste");
    page.setOriCpf(cpf);
    page.setOriEmail("orientador.teste@uscsonline.com.br");
    page.setOriSenha("123456");
    page.setOriConfirmarSenha("123456");
    page.assertCadastrarDesabilitado();
    page.aceitarTermosOri();
    page.assertCadastrarHabilitado();
    page.clickCadastrar();
  });
});
