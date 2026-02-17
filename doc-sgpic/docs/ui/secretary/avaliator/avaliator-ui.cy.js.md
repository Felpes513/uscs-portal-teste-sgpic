---
title: avaliator-ui
sidebar_position: 1
---

# Secretaria - Avaliadores Externos

## Descrição

Este teste valida o ciclo completo de gestão de avaliadores externos no SGPIC realizado pela secretaria, incluindo cadastro, validação de dados, envio de avaliações, edição de registros, consulta de envios e exclusão de avaliadores.

## Cenário 1 - Cadastrar Avaliador Externo

- **Dado** que a secretaria está autenticada no sistema e acessa a área de avaliadores
- **Quando** clica em "Novo Avaliador", seleciona o tipo "Externo" e preenche todos os dados obrigatórios (nome, e-mail, especialidade, subespecialidade e link Lattes)
- **Então** o sistema registra o novo avaliador externo na base de dados

## Cenário 2 - Validar Dados do Avaliador na Listagem

- **Dado** que a secretaria está na área de avaliadores onde o avaliador externo já foi cadastrado
- **Quando** consulta a listagem de avaliadores
- **Então** o sistema exibe corretamente os dados do avaliador (nome, e-mail, especialidade e subespecialidade) e o link para o currículo Lattes

## Cenário 3 - Enviar Avaliação para Avaliador Externo

- **Dado** que a secretaria está na área de avaliadores com um projeto disponível
- **Quando** clica em "Enviar Avaliação", seleciona um projeto, marca o avaliador para receber a avaliação, preenche assunto e mensagem
- **Então** o sistema envia a solicitação de avaliação para o avaliador externo selecionado

## Cenário 4 - Editar Dados do Avaliador Externo

- **Dado** que a secretaria acessa a área de avaliadores e localiza um avaliador cadastrado
- **Quando** clica em "Editar" e altera os dados do avaliador (nome, especialidade, subespecialidade e link Lattes)
- **Então** o sistema atualiza as informações do avaliador na base de dados

## Cenário 5 - Consultar Envios Recebidos pelo Avaliador

- **Dado** que a secretaria está na listagem de avaliadores com dados atualizados
- **Quando** verifica os dados revisados e clica em "Ver Envios" do avaliador
- **Então** o sistema exibe histórico de avaliações enviadas para esse avaliador externo

## Cenário 6 - Excluir Avaliador Externo

- **Dado** que a secretaria está na listagem de avaliadores
- **Quando** seleciona a opção de exclusão para um avaliador externo específico
- **Então** o sistema remove permanentemente o avaliador da base administrativa

## Resultado Esperado

O sistema permite a secretaria executar todas as operações de gestão de avaliadores externos (criar, ler, atualizar, eliminar) com persistência adequada de dados e disponibilização de funcionalidades relacionadas como envio de avaliações e consulta de histórico.
