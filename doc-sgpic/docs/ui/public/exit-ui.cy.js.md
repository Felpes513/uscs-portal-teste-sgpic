---
title: exit-ui
sidebar_position: 1
---

# Público - Sair (Logout)

## Descrição

Este teste valida o funcionamento do logout (saída) do sistema SGPIC para os três perfis institucionais: secretaria, orientador e aluno, garantindo que o usuário seja redirecionado corretamente e sua sessão encerrada.

## Cenário 1 - Logout Secretaria

- **Dado** que um usuário com perfil de secretaria está autenticado e acessível na área administrativa do sistema
- **Quando** clica na opção "Sair" do menu de navegação
- **Então** o sistema finaliza a sessão e redireciona o usuário para a página pública de login

## Cenário 2 - Logout Orientador

- **Dado** que um usuário com perfil de orientador está autenticado no sistema
- **Quando** clica na opção "Sair" do menu de navegação
- **Então** o sistema finaliza a sessão e redireciona o usuário para a página pública de login

## Cenário 3 - Logout Aluno

- **Dado** que um usuário com perfil de aluno está autenticado no sistema
- **Quando** clica na opção "Sair" do menu de navegação
- **Então** o sistema finaliza a sessão e redireciona o usuário para a página pública de login

## Resultado Esperado

O sistema encerra corretamente a sessão de autenticação para todos os perfis de usuário, removendo dados de sessão e redirecionando para a página pública de login sem permitir acesso às áreas protegidas após logout.
