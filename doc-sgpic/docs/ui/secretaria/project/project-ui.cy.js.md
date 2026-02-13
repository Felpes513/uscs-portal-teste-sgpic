---
title: project-ui
sidebar_position: 2
---

# Secretaria - Projetos

## Descrição

Este teste valida o gerenciamento operacional de projetos pela secretaria no SGPIC, incluindo criação de novos projetos, atualização de listas de dados, aplicação de filtros e consultas por diferentes estados de acompanhamento (em execução, concluídos e cancelados).

## Cenário 1 - Criar Novo Projeto

- **Dado** que a secretaria está autenticada no sistema e acessa a área de projetos
- **Quando** clica em "Novo Projeto" e preenche todos os dados obrigatórios (código, título, resumo, orientador, campus) e anexa documentação obrigatória
- **Então** o sistema registra o novo projeto na base de dados com as informações fornecidas

## Cenário 2 - Recarregar Listagem de Projetos

- **Dado** que a secretaria está na listagem de projetos
- **Quando** clica em "Recarregar" para atualizar os dados
- **Então** o sistema efetua uma sincronização com a base de dados e atualiza a listagem exibida

## Cenário 3 - Buscar Projeto Específico

- **Dado** que a secretaria está na listagem de projetos
- **Quando** utiliza a barra de busca e insere o nome ou código de um projeto
- **Então** o sistema filtra e exibe os projetos que correspondem ao critério informado

## Cenário 4 - Filtrar Todos os Projetos

- **Dado** que a secretaria está na listagem de projetos com filtros ativos
- **Quando** clica no filtro "Todos"
- **Então** o sistema exibe o conjunto completo de projetos cadastrados no SGPIC

## Cenário 5 - Filtrar Projetos em Execução

- **Dado** que a secretaria está na listagem de projetos
- **Quando** aplica o filtro "Em Execução"
- **Então** o sistema exibe somente projetos com status ativo de acompanhamento

## Cenário 6 - Filtrar Projetos Concluídos

- **Dado** que a secretaria está na listagem de projetos
- **Quando** aplica o filtro "Concluídos"
- **Então** o sistema exibe somente projetos com status de conclusão finalizado

## Cenário 7 - Filtrar Projetos Cancelados

- **Dado** que a secretaria está na listagem de projetos
- **Quando** aplica o filtro "Cancelados"
- **Então** o sistema exibe somente projetos com status de cancelamento registrado

## Resultado Esperado

O sistema oferece à secretaria funcionalidades completas de gestão de projetos, permitindo criação, consulta, busca e filtragem por diferentes critérios de estado, com atualização de dados em tempo real.
