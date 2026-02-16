---
sidebar_position: 1
---

# SGPIC - Documentação de Testes Automatizados

Bem-vindo à documentação dos testes automatizados do **SGPIC (Sistema de Gerenciamento de Projetos de Iniciação Científica)** da **USCS (Universidade São Caetano do Sul)**.

## 📋 Sobre Este Projeto

Este projeto contém uma suite completa de testes automatizados desenvolvidos em **Cypress** para validar a funcionalidade do sistema SGPIC. Os testes cobrem:

- ✅ **Autenticação e Login** de três perfis institucionais
- ✅ **Registro e Cadastro** de alunos e orientadores
- ✅ **Gerenciamento de Projetos** de iniciação científica
- ✅ **Avaliadores Externos** e envio de avaliações
- ✅ **Configurações Administrativas** da secretaria
- ✅ **Certificados e E-mails** em lote
- ✅ **Aprovação de Cadastros** de usuários
- ✅ **Logout** e saída do sistema

## 🎯 Estrutura da Documentação

A documentação está organizada por módulos de funcionalidade:

### 📁 **Login**
Validação de autenticação para os três perfis:
- Aluno
- Orientador
- Secretaria

### 📁 **Registro**
Processo de cadastro de novos usuários (aluno e orientador) com validação de dados obrigatórios.

### 📁 **Secretaria**
Funcionalidades administrativas:
- **Avaliadores Externos** - Cadastro e gerenciamento de avaliadores
- **Projetos** - Criação e filtro de projetos
- **Configurações** - Campus, cursos, bolsas e usuários secretários
- **Certificados (E-mail)** - Download de relatórios e envio em lote
- **Cadastros** - Aprovação e gerenciamento de adimplência

### 📁 **Público**
- **Logout** - Validação de saída do sistema para todos os perfis

## 🚀 Como Usar Esta Documentação

1. **Navegue pelas categorias** no menu lateral esquerdo
2. **Acesse cada cenário** para entender:
   - A descrição da funcionalidade
   - Os passos em formato BDD (Dado, Quando, Então)
   - O resultado esperado do teste
3. **Use como referência** para implementar e manter testes

## 🛠️ Tecnologias Utilizadas

- **Cypress** - Framework de testes end-to-end
- **JavaScript/Node.js** - Linguagem de desenvolvimento
- **Docusaurus** - Plataforma de documentação
- **BDD (Behavior-Driven Development)** - Padrão de documentação

## 📝 Padrão de Documentação

Todos os cenários de teste são documentados em formato **BDD**:

```
- **Dado** que [precondição/estado inicial]
- **Quando** que [ação do usuário/trigger]
- **Então** que [resultado esperado/assertions]
```

Este padrão garante clareza, rastreabilidade e facilita a comunicação entre desenvolvedores e stakeholders.

## 📊 Atualização Automática

A documentação é **automaticamente gerada** a partir dos testes Cypress. Sempre que novos testes são adicionados ou modificados, execute:

```bash
GERAR DOCUMENTAÇÃO
```

Este comando varre todos os arquivos em `cypress/e2e/` e atualiza os arquivos correspondentes em `doc-sgpic/docs/`.

## ✨ Contribuindo

Para adicionar ou modificar testes:

1. Crie ou edite um arquivo em `cypress/e2e/`
2. Siga o padrão de nomeação: `[modulo]-[funcionalidade].cy.js`
3. Escreva os testes com nomes descritivos
4. Execute `GERAR DOCUMENTAÇÃO` para atualizar a documentação

## 📞 Suporte

Para dúvidas ou sugestões sobre os testes, consulte a documentação específica de cada módulo ou entre em contato com a equipe de QA.
