

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
