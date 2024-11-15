/// <reference types="cypress" />

import {createEmployer, CreateEmployerProps} from "./commands";


declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            createEmployer(options: CreateEmployerProps): Chainable<void>;
        }
    }
}


Cypress.Commands.add('createEmployer', createEmployer);
