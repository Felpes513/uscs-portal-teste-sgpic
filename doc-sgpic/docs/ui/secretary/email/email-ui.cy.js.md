---
title: email-ui
sidebar_position: 1
---

# Secretaria - Certificados (E-mail)

## Descrição

Este teste valida as funcionalidades de gestão de relatórios e envio de certificados pela secretaria no SGPIC, incluindo download de exemplos de importação, geração de relatórios de alunos e workshop, processamento de planilhas e envio de e-mails em lote.

## Cenário 1 - Fazer Download de Exemplo de Importação

- **Dado** que a secretaria está autenticada e acessa a seção de certificados/e-mail
- **Quando** clica em "Baixar Exemplo de Excel" para obter o template de importação
- **Então** o sistema faz download do arquivo `exemplo_importacao.xlsx` com sucesso

## Cenário 2 - Fazer Download de Relatório de Alunos

- **Dado** que a secretaria está na área de certificados/e-mail
- **Quando** clica em "Baixar Relatório de Alunos" para exportar dados de alunos
- **Então** o sistema faz download do arquivo `relatorio_alunos.xlsx` com sucesso

## Cenário 3 - Fazer Download de Relatório de Workshop

- **Dado** que a secretaria está na área de certificados/e-mail
- **Quando** clica em "Baixar Workshop" para exportar dados de workshop
- **Então** o sistema faz download do arquivo `relatorio_workshop.xlsx` com sucesso

## Cenário 4 - Inputar Documento e Limpar Campo de Envio

- **Dado** que a secretaria anexa uma planilha Excel na área de certificados/e-mail
- **Quando** o arquivo é selecionado com sucesso
- **Então** os botões "Enviar E-mails" e "Limpar" são habilitados, e ao clicar em "Limpar", o campo é resetado e os botões voltam a ficar desabilitados

## Cenário 5 - Inputar Documento e Enviar E-mails

- **Dado** que a secretaria anexa uma planilha Excel válida na área de certificados/e-mail
- **Quando** os botões são habilitados e o usuário clica em "Enviar E-mails"
- **Então** o sistema processa o arquivo e envia os certificados por e-mail aos destinatários listados na planilha

## Resultado Esperado

O sistema oferece à secretaria ferramentas completas de gestão de relatórios e envio em lote de certificados, com download de templates, geração de dados, validação de arquivos e envio automatizado de e-mails com confirmação de sucesso.
