---
title: settings-ui
sidebar_position: 4
---

# Secretaria - Configurações (Campus)

## Descrição

Este teste valida o conjunto completo de funcionalidades administrativas da secretaria no SGPIC, incluindo gestão de campus, cursos, tipos de bolsas, vínculo e desvínculo de bolsas para alunos, cadastro de usuários secretários e redefinição de senhas.

## Cenário 1 - Acessar Tela de Configurações

- **Dado** que a secretaria está autenticada no sistema
- **Quando** clica no menu de configurações
- **Então** o sistema exibe a tela administrativa de configurações com todas as abas disponíveis

## Cenário 2 - Cadastrar Campus

- **Dado** que a secretaria está na página de configurações, seção Campus
- **Quando** preenche o nome do novo campus e clica em "Salvar"
- **Então** o sistema registra o campus e o exibe imediatamente na listagem

## Cenário 3 - Excluir Campus

- **Dado** que a secretaria está na seção Campus e um campus foi previamente cadastrado
- **Quando** seleciona a opção de exclusão e confirma a ação
- **Então** o sistema remove o campus da base de dados e ele não aparece mais na listagem

## Cenário 4 - Cadastrar Curso

- **Dado** que a secretaria acessa a aba "Cursos"
- **Quando** preenche o nome do novo curso e clica em "Salvar Curso"
- **Então** o sistema registra o curso e o apresenta na listagem de cursos disponíveis

## Cenário 5 - Excluir Curso

- **Dado** que a secretaria está na aba "Cursos" e um curso foi previamente cadastrado
- **Quando** seleciona a opção de exclusão e confirma a ação
- **Então** o sistema remove o curso e ele não aparece mais na listagem

## Cenário 6 - Cadastrar Tipo de Bolsa

- **Dado** que a secretaria acessa a aba "Bolsas"
- **Quando** preenche o nome do novo tipo de bolsa e clica em "Salvar Tipo de Bolsa"
- **Então** o sistema registra o tipo de bolsa e o exibe na listagem

## Cenário 7 - Vincular Bolsa a Aluno

- **Dado** que a secretaria está na aba "Bolsas" e utiliza o filtro para localizar um aluno
- **Quando** clica em "Vincular Bolsa" e seleciona o tipo de bolsa desejado no modal
- **Então** o sistema registra o vínculo e identifica o aluno com a bolsa associada

## Cenário 8 - Excluir Tipo de Bolsa

- **Dado** que a secretaria está na aba "Bolsas" e um tipo de bolsa foi previamente cadastrado
- **Quando** seleciona a opção de exclusão e confirma a ação
- **Então** o sistema remove o tipo de bolsa da base de dados

## Cenário 9 - Desvincular Bolsa de Aluno

- **Dado** que a secretaria está na aba "Bolsas" e um aluno possui uma bolsa vinculada
- **Quando** identifica o aluno com bolsa e clica em "Desvincular" e confirma
- **Então** o sistema remove a associação e o aluno deixa de estar identificado com essa bolsa

## Cenário 10 - Cadastrar Usuário Secretário

- **Dado** que a secretaria acessa a aba "Secretarias"
- **Quando** preenche todos os dados obrigatórios (nome, e-mail, CPF, senha) e clica em "Salvar Secretaria"
- **Então** o sistema registra o novo usuário secretário e exibe mensagem de sucesso

## Cenário 11 - Resetar Senha de Secretária

- **Dado** que a secretaria está na aba "Secretarias"
- **Quando** localiza um e-mail de secretária e clica em "Resetar Senha"
- **Então** o sistema processa a solicitação e inicializa o procedimento de redefinição de senha para o usuário

## Resultado Esperado

O sistema oferece à secretaria controle administrativo completo sobre configurações institucionais, permitindo gerenciar recursos (campus, cursos, bolsas), usuários (secretários) e segurança (redefinição de senhas) com atualização de interfaces em tempo real.
