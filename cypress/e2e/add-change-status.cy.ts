describe('add / change status', () => {
  beforeEach(() => {
      cy.visit('http://localhost:5173')
  })
  it('add new status', () => {
      cy.createEmployer({companyName: 'testCompany', description: 'test', hrName: 'test', contacts: 'test'})
      cy.createInterview({companyName: 'testCompany',date: '2020-01-01T10:00:00', description: 'Тестовое описание прошедшего интервью', status: 'Завершено'})

  });

  it('create several interviews', () => {
    cy.createEmployer({companyName: 'testCompany', description: 'test', hrName: 'test', contacts: 'test'})
    cy.createInterview({companyName: 'testCompany',date: '2020-01-01T10:00:00', description: 'Тестовое описание прошедшего интервью', status: 'Завершено'})
    cy.createInterview({companyName: 'testCompany',date: '2020-01-01T10:00:00', description: 'Злой техлид отказал на секции алгосов.', status: 'Отказ'})
      cy.findByTestId('expandInterviewList').click()
  });

  it('change status', () => {
      cy.createEmployer({companyName: 'testCompany', description: 'test', hrName: 'test', contacts: 'test'})
      cy.createInterview({companyName: 'testCompany', date: '2020-01-01T10:00:00', description: 'Тестовое описание прошедшего интервью', status: 'Завершено'})
      cy.findByTestId('expandInterviewList').click()
      cy.findByTestId('editInterview').click()
      cy.findByTestId('selectInterviewStatus').select('В ожидании')
      cy.findByTestId('saveInterviewEdit').click()
      cy.contains('Собеседования').parent().parent().contains('В ожидании').should('exist');
  });


    it('cancel change status', () => {
        cy.createEmployer({companyName: 'testCompany', description: 'test', hrName: 'test', contacts: 'test'})
        cy.createInterview({companyName: 'testCompany', date: '2020-01-01T10:00:00', description: 'Тестовое описание прошедшего интервью', status: 'Завершено'})
        cy.findByTestId('expandInterviewList').click()
        cy.findByTestId('editInterview').click()
        cy.findByTestId('selectInterviewStatus').select('В ожидании')
        cy.findByTestId('cancelInterviewEdit').click()
        cy.contains('Собеседования').parent().parent().parent().contains('Завершено').should('exist');
    });

});
