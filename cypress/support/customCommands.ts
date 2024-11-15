/// <reference types="cypress" />

import {createEmployer, CreateEmployerProps, createInterview, CreateInterviewProps} from "./commands";


declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            createEmployer(options: CreateEmployerProps): Chainable<void>;
            createInterview(options: CreateInterviewProps): Chainable<void>;
        }
    }
}


Cypress.Commands.add("createEmployer", createEmployer);
Cypress.Commands.add('createInterview', createInterview);
