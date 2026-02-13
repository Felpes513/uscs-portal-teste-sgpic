---
title: aluno-login-ui
sidebar_position: 1
---

# Login - Aluno

## Descrição

Este teste valida o fluxo completo de autenticação de um aluno no SGPIC, desde o acesso à página inicial até o redirecionamento bem-sucedido para a área de gerenciamento de projetos do perfil de aluno.

## Cenário

- **Dado** que o usuário acessa a página inicial do SGPIC
- **Quando** o usuário clica na opção de login para aluno e insere credenciais válidas (e-mail e senha)
- **Então** o sistema efetua o login e redireciona o usuário para a página de projetos do aluno

## Resultado Esperado

O usuário, após uma autenticação bem-sucedida, é redirecionado automaticamente para o caminho `/aluno/projetos`, onde pode acessar seus projetos de iniciação científica cadastrados no SGPIC.

## Cenário

Dado que o usuário acessa o sistema SGPIC
Quando seleciona a opção de login de aluno, informa credenciais válidas e submete o acesso
Então o sistema conclui a autenticação do perfil de aluno e direciona o usuário para sua área de projetos

## Resultado Esperado

O sistema deve autenticar o aluno com sucesso e redirecionar para a rota de projetos do aluno.
