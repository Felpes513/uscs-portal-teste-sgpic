---
title: reports-ui
sidebar_position: 1
---

# UI - Fluxos do Orientador (Relatórios)

## Descrição

Este conjunto de cenários valida as funcionalidades de relatórios mensais disponíveis para orientadores no SGPIC, incluindo acesso à página de relatórios de um projeto, preenchimento do formulário de relatório, fechamento do formulário e confirmação do envio do relatório mensal.

## Cenário 1 - Abrir página de relatórios do primeiro projeto

- **Dado** que o orientador está autenticado no sistema e visualiza a listagem de seus projetos
- **Quando** o orientador acessa os relatórios do primeiro projeto da lista
- **Então** o sistema apresenta a página de relatórios desse projeto

## Cenário 2 - Preencher relatório e clicar em "Fechar"

- **Dado** que o orientador está na página de relatórios de um projeto
- **Quando** preenche o formulário do relatório (referência do mês, resumo, atividades, bloqueios, próximos passos, horas) e clica em "Fechar"
- **Então** o sistema fecha o modal/fluxo de edição e redireciona, conforme implementação, para a listagem de projetos do orientador

## Cenário 3 - Confirmar relatório mensal

- **Dado** que o orientador está na página de relatórios de um projeto com formulário preenchido
- **Quando** confirma a submissão do relatório mensal
- **Então** o sistema envia a requisição de confirmação do relatório mensal para o endpoint responsável e registra a confirmação do relatório

## Resultado Esperado

O sistema permite ao orientador acessar relatórios por projeto, preencher e fechar o formulário localmente e confirmar o envio do relatório mensal, com persistência adequada no backend e fluxo de navegação consistente para a listagem de projetos.