---
title: registration-ui
sidebar_position: 1
---

# Secretaria - Cadastros (UI)

## Descrição

Este teste valida o ciclo completo de aprovação e gerenciamento de registros de alunos e orientadores pela secretaria no SGPIC, incluindo download de comprovantes, gerenciamento de status de adimplência e aprovação de usuários.

## Cenário 1 - Acessar Tela de Alunos e Baixar PDF

- **Dado** que a secretaria está autenticada e acessa a aba "Aprovações" na seção "Cadastros"
- **Quando** localiza um aluno específico e clica em "Download PDF"
- **Então** o sistema gera e disponibiliza o PDF do comprovante do aluno para download

## Cenário 2 - Cancelar Inadimplentação de Aluno

- **Dado** que a secretaria está na aba "Aprovações" visualizando alunos
- **Quando** localiza um aluno e clica em "Inadimplentar", mas cancela a ação no diálogo de confirmação
- **Então** nenhuma alteração de status é realizada e o aluno mantém seu status atual

## Cenário 3 - Confirmar Inadimplentação de Aluno

- **Dado** que a secretaria está na aba "Aprovações" visualizando alunos
- **Quando** localiza um aluno, clica em "Inadimplentar" e confirma a ação no diálogo
- **Então** o sistema muda o status do aluno para "INADIMPLENTE" na base de dados

## Cenário 4 - Adimplentar Aluno

- **Dado** que a secretaria está na aba "Inadimplentes" e um aluno possui status inadimplente
- **Quando** localiza o aluno e clica em "Adimplentar" e confirma a ação
- **Então** o sistema muda o status do aluno para "ADIMPLENTE" e o remove da lista de inadimplentes

## Cenário 5 - Cancelar Inadimplentação de Orientador

- **Dado** que a secretaria está na aba "Aprovações" na seção "Orientadores"
- **Quando** localiza um orientador e clica em "Inadimplentar", mas cancela a ação no diálogo
- **Então** nenhuma alteração de status é realizada e o orientador mantém seu status atual

## Cenário 6 - Confirmar Inadimplentação de Orientador

- **Dado** que a secretaria está na aba "Aprovações" na seção "Orientadores"
- **Quando** localiza um orientador, clica em "Inadimplentar" e confirma a ação
- **Então** o sistema muda o status do orientador para "INADIMPLENTE" na base de dados

## Cenário 7 - Adimplentar Orientador

- **Dado** que a secretaria está na aba "Inadimplentes" e um orientador possui status inadimplente
- **Quando** localiza o orientador e clica em "Adimplentar" e confirma a ação
- **Então** o sistema muda o status do orientador para "ADIMPLENTE" e o remove da lista de inadimplentes

## Resultado Esperado

O sistema oferece à secretaria controle completo sobre o status de adimplência de alunos e orientadores, permitindo transições de status com confirmação, download de comprovantes e visualização separada de usuários inadimplentes.
