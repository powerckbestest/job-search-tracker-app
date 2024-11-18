/// <reference types="cypress" />

import {
  clearDownloads,
  createEmployer,
  CreateEmployerProps,
  createInterview,
  CreateInterviewProps,
} from './commands';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      createEmployer(options: CreateEmployerProps): Chainable<void>;
      createInterview(options: CreateInterviewProps): Chainable<void>;
      clearDownloads(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('createEmployer', createEmployer);
Cypress.Commands.add('createInterview', createInterview);
Cypress.Commands.add('clearDownloads', clearDownloads);
