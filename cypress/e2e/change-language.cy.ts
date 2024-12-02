describe('Change language', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should change language', () => {
    cy.findByTestId('language-selector').click();
    cy.findByTestId('language-selector-ru').click();
    cy.contains('Поиск работы').should('exist');
  });

  it('should change language to english', () => {
    cy.findByTestId('language-selector').click();
    cy.findByTestId('language-selector-en').click();
    cy.contains('Job search tracker').should('exist');
  });
});
