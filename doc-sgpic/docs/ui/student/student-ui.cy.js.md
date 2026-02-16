---
title: student-ui
sidebar_position: 1
---

# UI - Fluxos do Aluno

## Descrição

Este conjunto de cenários valida as principais interações do aluno no SGPIC, incluindo downloads de documentos por fase do projeto, navegação de retorno para a listagem, e fluxos de inscrição em projetos com confirmação ou cancelamento.

## Cenário 1 - Realizar downloads (PDF e DOCX) das três fases

- **Dado** que o aluno está autenticado e visualiza a listagem de projetos
- **Quando** o aluno abre o primeiro projeto e solicita download dos documentos das fases (Submissão do Projeto, Monografia Parcial, Monografia Final) nos formatos PDF e DOCX
- **Então** o sistema inicia o download dos arquivos correspondentes para cada fase e tipo solicitado

## Cenário 2 - Voltar para a listagem ao clicar em "Voltar"

- **Dado** que o aluno está visualizando o detalhe de um projeto
- **Quando** clica em "Voltar" na tela de detalhe do projeto
- **Então** o sistema redireciona o aluno de volta para a listagem de projetos

## Cenário 3 - Cancelar inscrição no projeto (não dispara requisição)

- **Dado** que o aluno inicia o fluxo de inscrição no primeiro projeto
- **Quando** ao confirmar a ação escolhe "Cancelar" na caixa de confirmação
- **Então** o sistema não realiza a inscrição nem dispara a requisição ao backend

## Cenário 4 - Confirmar inscrição no projeto (altera estado para "Inscrito")

- **Dado** que o aluno inicia o fluxo de inscrição no primeiro projeto
- **Quando** ao confirmar a ação escolhe "OK" na caixa de confirmação
- **Então** o sistema realiza a inscrição, atualiza o estado do botão para "Inscrito" e persiste a inscrição

## Resultado Esperado

O sistema fornece ao aluno recursos para acessar documentos, gerenciar sua inscrição nos projetos com confirmação explícita e navegar de volta à listagem de projetos, mantendo consistência no estado da interface e nas requisições ao backend.
