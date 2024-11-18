describe('add / edit employer card', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('cancel adding new employer', () => {
    cy.findByTestId('addEmployer').click();
    cy.findByTestId('companyName').type('test');
    cy.findByTestId('description').type('test');
    cy.findByTestId('hrName').type('test');
    cy.findByTestId('contacts').type('test');
    cy.findByTestId('cancel').click();
  });

  it('add new employer', () => {
    cy.createEmployer({
      companyName: 'test',
      description: 'test',
      hrName: 'test',
      contacts: 'test',
    });
  });

  it('add 2 new employer', () => {
    cy.createEmployer({
      companyName: 'test',
      description: 'test',
      hrName: 'test',
      contacts: 'test',
    });
    cy.createEmployer({
      companyName: 'test2',
      description: 'test2',
      hrName: 'test2',
      contacts: 'test2',
    });
  });

  it('delete employer', () => {
    cy.createEmployer({
      companyName: 'test',
      description: 'test',
      hrName: 'test',
      contacts: 'test',
    });
    cy.findByTestId('deleteEmployer').click();
    cy.findByTestId('confirm-delete').click();
    cy.findByTestId('employerCard').should('not.exist');
    cy.findByText('Нет добавленных работодателей').should('exist');
  });

  it('cancel delete employer', () => {
    cy.createEmployer({
      companyName: 'test',
      description: 'test',
      hrName: 'test',
      contacts: 'test',
    });

    cy.findByTestId('deleteEmployer').click();
    cy.findByTestId('confirm-cancel').click();
    cy.findByTestId('employerCard').should('exist');
  });

  it('edit employer', () => {
    cy.createEmployer({
      companyName: 'test',
      description: 'test',
      hrName: 'test',
      contacts: 'test',
    });

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
    cy.createEmployer({
      companyName: 'test',
      description: 'test',
      hrName: 'test',
      contacts: 'test',
    });

    cy.findByTestId('expandInterviewList').click();
    cy.findByTestId('editEmployer').click();
    cy.findByTestId('companyName').clear().type('test2');
    cy.findByTestId('description').clear().type('test2');
    cy.findByTestId('hrName').clear().type('test2');
    cy.findByTestId('contacts').clear().type('test2');
    cy.findByTestId('cancel').click();

    cy.contains('test').should('exist');
    cy.contains('test2').should('not.exist');
  });
});
