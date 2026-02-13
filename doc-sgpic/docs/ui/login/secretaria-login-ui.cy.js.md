---
title: secretaria-login-ui
sidebar_position: 1
---

# Login - Secretaria

## Descrição

Este teste valida o fluxo completo de autenticação de um usuário com perfil de secretaria no SGPIC, garantindo que o acesso institucional com credenciais válidas encaminhe o usuário para o painel administrativo de projetos.

## Cenário

- **Dado** que o usuário acessa a página inicial do SGPIC
- **Quando** o usuário clica na opção de login para secretaria e insere credenciais válidas (e-mail e senha)
- **Então** o sistema efetua o login e redireciona o usuário para a página de projetos da secretaria

## Resultado Esperado

O usuário, após uma autenticação bem-sucedida, é redirecionado automaticamente para o caminho `/secretaria/projetos`, onde pode acessar o painel administrativo para gerenciar projetos, avaliadores e outras funcionalidades institucionais.

## Cenário

Dado que o usuário acessa o sistema SGPIC
Quando seleciona a opção de login de secretaria, informa credenciais válidas e confirma o acesso
Então o sistema autentica o perfil de secretaria e redireciona para a área de projetos da secretaria

## Resultado Esperado

O sistema deve realizar o login da secretaria com sucesso e apresentar a rota de projetos correspondente ao perfil.
