# SGPIC — Testes Automatizados

> Suite de testes end-to-end para o **Sistema de Gerenciamento de Projetos de Iniciação Científica** da **Universidade São Caetano do Sul (USCS)**.

---

## Sobre o projeto

O SGPIC é o sistema institucional da USCS que gerencia todo o ciclo de vida dos projetos de iniciação científica — desde a inscrição de alunos e orientadores até a emissão de certificados e avaliações externas.

Este repositório contém a suite de testes automatizados que valida as funcionalidades do sistema, garantindo qualidade e rastreabilidade em cada fluxo crítico da aplicação.

---

## O que é testado

| Módulo | Perfis cobertos |
|---|---|
| Login e autenticação | Aluno, Orientador, Secretaria |
| Registro e cadastro | Aluno, Orientador |
| Fluxo do estudante | Aluno |
| Gerenciamento de projetos | Secretaria |
| Avaliadores externos | Secretaria |
| Configurações administrativas | Secretaria |
| Certificados e envio por e-mail | Secretaria |
| Aprovação de cadastros e adimplência | Secretaria |
| Logout | Todos os perfis |

---

## Tecnologias

- **[Cypress](https://www.cypress.io/)** — framework de testes end-to-end
- **JavaScript / Node.js** — linguagem dos testes
- **[Docusaurus](https://docusaurus.io/)** — plataforma da documentação técnica

---

## Estrutura do repositório

```
uscs-portal-teste-sgpic/
├── cypress/
│   └── e2e/
│       ├── ui/              # Testes de interface (UI)
│       │   ├── login/
│       │   ├── registration/
│       │   ├── student/
│       │   ├── secretaria/
│       │   └── public/
│       └── api/             # Testes de API
├── doc-sgpic/               # Documentação técnica (Docusaurus)
└── cypress.config.js
```

---

## Documentação técnica

A documentação completa dos cenários de teste — escrita em formato BDD (Dado / Quando / Então) — está disponível no diretório `doc-sgpic/` e pode ser acessada localmente:

```bash
cd doc-sgpic
npm install
npm start
```

---

## Executando os testes

**Instalar dependências:**
```bash
npm install
```

**Abrir o Cypress em modo interativo:**
```bash
npx cypress open
```

**Executar todos os testes em modo headless:**
```bash
npx cypress run
```

---

## Contexto acadêmico

Este projeto foi desenvolvido no contexto da **USCS — Universidade São Caetano do Sul**, com o objetivo de garantir a qualidade do portal SGPIC utilizado por alunos, orientadores e equipe da secretaria nos processos de iniciação científica da universidade.
