describe('add / edit employer card', () => {
  it('cancel adding new employer', () => {
    cy.visit('http://localhost:5173');

    cy.findByTestId('addEmployer').click();
    cy.findByTestId('companyName').type('test');
    cy.findByTestId('description').type('test');
    cy.findByTestId('hrName').type('test');
    cy.findByTestId('contacts').type('test');
    cy.findByTestId('cancel').click();
    cy.findByText('test').should('not.exist');
  });

  it('add new employer', () => {
    cy.visit('http://localhost:5173');

    cy.findByTestId('addEmployer').click();
    cy.findByTestId('companyName').type('test');
    cy.findByTestId('description').type('test');
    cy.findByTestId('hrName').type('test');
    cy.findByTestId('contacts').type('test');
    cy.findByTestId('save').click();
    cy.findByTestId('employerCard').should('exist');
  });

  it('add 2 new employer', () => {
    cy.visit('http://localhost:5173');

    cy.findByTestId('addEmployer').click();
    cy.findByTestId('companyName').type('test');
    cy.findByTestId('description').type('test');
    cy.findByTestId('hrName').type('test');
    cy.findByTestId('contacts').type('test');
    cy.findByTestId('save').click();

    cy.findByTestId('addEmployer').click();
    cy.findByTestId('companyName').type('test2');
    cy.findByTestId('description').type('test2');
    cy.findByTestId('hrName').type('test2');
    cy.findByTestId('contacts').type('test2');
    cy.findByTestId('save').click();

    cy.contains('test').should('exist');
    cy.contains('test2').should('exist');
  });

  it('delete employer', () => {
    cy.visit('http://localhost:5173');

    cy.findByTestId('addEmployer').click();
    cy.findByTestId('companyName').type('test');
    cy.findByTestId('description').type('test');
    cy.findByTestId('hrName').type('test');
    cy.findByTestId('contacts').type('test');
    cy.findByTestId('save').click();
    cy.findByTestId('employerCard').should('exist');

    cy.findByTestId('expandInterviewList').click();
    cy.findByTestId('deleteEmployer').click();
    cy.findByTestId('employerCard').should('not.exist');
    cy.findByText('Нет добавленных работодателей').should('exist');
  });

  it('edit employer', () => {
    cy.visit('http://localhost:5173');

    cy.findByTestId('addEmployer').click();
    cy.findByTestId('companyName').type('test');
    cy.findByTestId('description').type('test');
    cy.findByTestId('hrName').type('test');
    cy.findByTestId('contacts').type('test');
    cy.findByTestId('save').click();
    cy.findByTestId('employerCard').should('exist');

    cy.findByTestId('expandInterviewList').click();
    cy.findByTestId('editEmployer').click();
    cy.findByTestId('companyName').clear().type('test2');
    cy.findByTestId('description').clear().type('test2');
    cy.findByTestId('hrName').clear().type('test2');
    cy.findByTestId('contacts').clear().type('test2');
    cy.findByTestId('save').click();

    cy.findByTestId('employerCard').should('exist');
    cy.contains('test2').should('exist');
    cy.contains('test1').should('not.exist');
  });

  it('cancel edit employer', () => {
    cy.visit('http://localhost:5173');

    cy.findByTestId('addEmployer').click();
    cy.findByTestId('companyName').type('test');
    cy.findByTestId('description').type('test');
    cy.findByTestId('hrName').type('test');
    cy.findByTestId('contacts').type('test');
    cy.findByTestId('save').click();
    cy.findByTestId('employerCard').should('exist');

    cy.findByTestId('expandInterviewList').click();
    cy.findByTestId('editEmployer').click();
    cy.findByTestId('companyName').clear().type('test2');
    cy.findByTestId('description').clear().type('test2');
    cy.findByTestId('hrName').clear().type('test2');
    cy.findByTestId('contacts').clear().type('test2');
    cy.findByTestId('cancel').click();

    cy.contains('test1').should('exist');
    cy.contains('test2').should('not.exist');
  });
});
