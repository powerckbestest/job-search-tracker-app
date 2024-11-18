

export type CreateEmployerProps = {
    companyName: string;
    description: string;
    hrName: string;
    contacts: string;
};
export const createEmployer = ({ companyName, description, hrName, contacts }: CreateEmployerProps): void => {
    cy.findByTestId('addEmployer').click();
    cy.findByTestId('companyName').type(companyName);
    cy.findByTestId('description').type(description);
    cy.findByTestId('hrName').type(hrName);
    cy.findByTestId('contacts').type(contacts);
    cy.findByTestId('save').click();
    cy.findAllByTestId('employerCard').contains(companyName);
};

export type CreateInterviewProps = {
    companyName: string;
    date: string;
    description: string;
    status: string;
};
export const createInterview = ({companyName, date, description, status }: CreateInterviewProps): void => {
    cy.findByText(companyName).parent().parent().parent().parent().within(() => {

    cy.findByTestId('expandInterviewList').click();
    cy.findByTestId('addInterview').click();
    cy.findByTestId('interviewDate').type(date);
    cy.findByTestId('interviewDescription').type(description);
    cy.findByTestId('selectInterviewStatus').select(status);
    cy.findByTestId('saveInterviewEdit').click();
    cy.contains('Собеседования').parent().parent().contains(description).parent().contains(status).should('exist');
    cy.findByTestId('expandInterviewList').click();
    })
};

export const clearDownloads = ()=>{
    const downloadsFolder = Cypress.config('downloadsFolder')
    cy.task('deleteFolder', downloadsFolder)
    cy.log('cleared downloads folder')
}
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import '@testing-library/cypress/add-commands';
