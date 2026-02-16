---
title: sudents-ui
sidebar_position: 1
---

# UI - Fluxos do Orientador (Selecionar Alunos)

## Descrição

Este conjunto de cenários valida a funcionalidade de seleção de alunos pelo orientador para um projeto, assegurando que a tela de seleção seja exibida, os dados do projeto permaneçam em modo somente leitura, que o limite máximo de alunos seja respeitado, que a seleção possa ser salva e que a navegação de retorno funcione corretamente.

## Cenário 1 - Abrir a tela de Selecionar Alunos do primeiro projeto

- **Dado** que o orientador está autenticado e visualiza a listagem de seus projetos
- **Quando** o orientador abre a opção de "Selecionar Alunos" do primeiro projeto
- **Então** o sistema exibe a página de seleção de alunos e posiciona o container no topo

## Cenário 2 - Dados do projeto em somente leitura

- **Dado** que o orientador está na página de seleção de alunos de um projeto
- **Quando** observa os detalhes do projeto
- **Então** os campos informativos do projeto devem estar em modo somente leitura, sem permitir edição

## Cenário 3 - Limite de seleção de até 4 alunos

- **Dado** que o orientador está na página de seleção de alunos
- **Quando** tenta selecionar alunos na lista
- **Então** o sistema deve limitar a seleção a, no máximo, 4 alunos e impedir a seleção além desse limite

## Cenário 4 - Salvar seleção de alunos

- **Dado** que o orientador selecionou até o número permitido de alunos
- **Quando** o orientador salva a seleção
- **Então** o sistema persiste a seleção de alunos e retorna confirmação de sucesso

## Cenário 5 - Voltar para a listagem ao clicar em "Voltar"

- **Dado** que o orientador está na página de seleção de alunos
- **When** o orientador rola o container até o fim e clica em "Voltar"
- **Então** o sistema retorna à listagem de projetos do orientador

## Resultado Esperado

O sistema garante que a funcionalidade de seleção de alunos pelos orientadores preserve a integridade dos dados do projeto, aplique o limite de seleção definido e permita salvar ou retornar à listagem de forma consistente.
