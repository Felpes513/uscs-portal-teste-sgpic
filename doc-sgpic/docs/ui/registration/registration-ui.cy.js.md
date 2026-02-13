---
title: registration-ui
sidebar_position: 1
---

# Cadastro - Seleção de Perfil

## Descrição

Este teste valida o processo completo de cadastro no SGPIC para dois perfis institucionais distintos: aluno e orientador. Abrange seleção de perfil, preenchimento de dados obrigatórios, validação de estados de submissão, carregamento de documentos e aceite de termos de uso.

## Cenário 1 - Cadastro de Aluno

- **Dado** que o usuário acessa a página inicial e encontra a opção de criar conta
- **Quando** o usuário clica em "Criar Conta", seleciona o perfil de aluno e preenche todos os dados obrigatórios (nome, CPF, e-mail, senha), escolhe curso e campus, carrega documentos de notas, seleciona status de trabalho remunerado e aceita os termos
- **Então** o sistema habilita o botão "Cadastrar" e executa o registro do novo usuário aluno no sistema

## Cenário 2 - Cadastro de Orientador

- **Dado** que o usuário acessa a página inicial e encontra a opção de criar conta
- **Quando** o usuário clica em "Criar Conta", seleciona o perfil de orientador e preenche os dados obrigatórios (nome, CPF, e-mail e senha) e aceita os termos de uso
- **Então** o sistema habilita o botão "Cadastrar" e executa o registro do novo usuário orientador no sistema

## Resultado Esperado

O sistema permite o cadastro de novos usuários com dois perfis distintos (aluno e orientador), validando o preenchimento obrigatório de campos específicos para cada perfil, habilitando progressivamente o botão de submissão apenas quando todos os requisitos são atendidos.
