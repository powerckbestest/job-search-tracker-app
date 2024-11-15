

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
    date: string;
    description: string;
    status: string;
};
export const createInterview = ({ date, description, status }: CreateInterviewProps): void => {
    cy.findByTestId('expandInterviewList').click();
    cy.findByTestId('addInterview').click();
    cy.findByTestId('interviewDate').type(date);
    cy.findByTestId('interviewDescription').type(description);
    cy.findByTestId('selectInterviewStatus').select(status);
    cy.findByTestId('saveInterviewEdit').click();
    cy.contains('Собеседования').parent().parent().parent().findByText(status).should('exist');
    cy.findByTestId('expandInterviewList').click();
};
