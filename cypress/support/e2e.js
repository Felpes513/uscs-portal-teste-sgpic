import "./commands";
import {
  loginSecretariaUi,
  loginOrientadorUi,
  loginAlunoUi,
} from "./helpers/login";

Cypress.Commands.add("loginSecretariaUi", loginSecretariaUi);
Cypress.Commands.add("loginOrientadorUi", loginOrientadorUi);
Cypress.Commands.add("loginAlunoUi", loginAlunoUi);
