---
title: orientador-login-ui
sidebar_position: 1
---

# Login - Orientador

## Descrição

Este teste valida o fluxo completo de autenticação de um orientador no SGPIC, garantindo que o acesso com credenciais válidas direcione corretamente para a área de gestão de projetos sob sua orientação.

## Cenário

- **Dado** que o usuário acessa a página inicial do SGPIC
- **Quando** o usuário clica na opção de login para orientador e insere credenciais válidas (e-mail e senha)
- **Então** o sistema efetua o login e redireciona o usuário para a página de projetos do orientador

## Resultado Esperado

O user, após uma autenticação bem-sucedida, é redirecionado automaticamente para o caminho `/orientador/projetos`, onde pode acessar e gerenciar todos os projetos sob sua orientação.

## Cenário

Dado que o usuário acessa o sistema SGPIC
Quando escolhe o login de orientador, informa credenciais válidas e submete o formulário
Então o sistema autentica o orientador e redireciona para a área de projetos do perfil de orientador

## Resultado Esperado

O sistema deve concluir o login do orientador com êxito e encaminhar para a rota de projetos do orientador.
