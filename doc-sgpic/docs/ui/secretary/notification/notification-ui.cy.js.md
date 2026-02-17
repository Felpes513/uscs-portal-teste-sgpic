---
title: notification-ui
sidebar_position: 1
---

# UI - Fluxos da Secretaria (Notificações)

## Descrição

Este conjunto de cenários valida as funcionalidades de leitura e gerenciamento de notificações da secretaria no SGPIC, incluindo acesso à página de notificações, marcação de todas como lidas com confirmação, abertura e fechamento de notificações individuais.

## Cenário 1 - Acessar a tela de notificações

- **Dado** que a secretaria está autenticada no sistema
- **Quando** acessa a seção de notificações
- **Então** o sistema apresenta a página de notificações com a listagem disponível

## Cenário 2 - Cancelar ação de "Marcar todas como lidas" (não deve chamar PUT)

- **Dado** que a secretaria está na página de notificações
- **Quando** inicia a ação de marcar todas como lidas e cancela na confirmação
- **Então** o sistema não deve disparar a requisição de marcação em massa (PUT mark-all) e o estado das notificações permanece inalterado

## Cenário 3 - Confirmar "Marcar todas como lidas" (chama PUT)

- **Dado** que a secretaria está na página de notificações
- **Quando** confirma a ação de marcar todas como lidas na caixa de confirmação
- **Então** o sistema deve executar a requisição de marcação em massa (PUT mark-all) e atualizar o estado das notificações para lidas

## Cenário 4 - Abrir uma notificação e fechar o modal

- **Dado** que a secretaria está na página de notificações
- **Quando** abre a primeira notificação da lista
- **Então** o sistema exibe o modal de notificação e permite fechá-lo retornando à listagem

## Resultado Esperado

O sistema fornece controle completo sobre a leitura e gerenciamento de notificações, incluindo confirmação segura para ações em massa, ausência de efeitos colaterais quando canceladas e interação consistente com modais de notificação.
