describe('Sorting', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');

    cy.createEmployer({
      companyName: 'Рога и копыта ООО',
      description: 'Мутные типы',
      hrName: 'Вася',
      contacts: 'test@test.ru',
    });

    cy.createInterview({
      companyName: 'Рога и копыта ООО',
      date: '2020-01-01T10:00:00',
      description: 'Первая встреча',
      status: 'В ожидании',
    });
    cy.createInterview({
      companyName: 'Рога и копыта ООО',
      date: '2021-01-01T10:00:00',
      description: 'Тестовое описание прошедшего интервью',
      status: 'Завершено',
    });

    cy.createEmployer({
      companyName: 'СберКо',
      description: 'Финтех',
      hrName: 'Maша',
      contacts: '88005553535',
    });
    cy.createInterview({
      companyName: 'СберКо',
      date: '2022-01-01T10:00:00',
      description: 'Первая встреча',
      status: 'Завершено',
    });
    cy.createInterview({
      companyName: 'СберКо',
      date: '2022-03-03T10:00:00',
      description: 'Техническое интервью ',
      status: 'Завершено',
    });
    cy.createInterview({
      companyName: 'СберКо',
      date: '2022-03-03T10:00:00',
      description: 'Техническое интервью ',
      status: 'Завершено',
    });
    cy.createInterview({
      companyName: 'СберКо',
      date: '2022-03-04T10:00:00',
      description: 'Знакомство c коммандой и оффер',
      status: 'Принят',
    });

    cy.createEmployer({
      companyName: 'Мумми-троль ОAО',
      description: 'Семейный бизнес',
      hrName: 'Мумми-мама',
      contacts: 'test@test.ru',
    });

    cy.createInterview({
      companyName: 'Мумми-троль ОAО',
      date: '2021-05-11T10:00:00',
      description: 'Первая встреча с муми',
      status: 'Завершено',
    });
  });

  it('should sort by last interview date', () => {
    cy.findByTestId('sortButton-lastInterviewDate').click();
    cy.findAllByTestId('employerCard').first().contains('СберКо');
  });

  it('should sort by first interview date', () => {
    cy.findByTestId('sortButton-lastInterviewDate').click();
    cy.findByTestId('sortButton-lastInterviewDate').click();
    cy.findAllByTestId('employerCard').first().contains('Рога и копыта ООО');
  });

  it('should sort by adding employer date', () => {
    cy.findByTestId('sortButton-lastInterviewDate').click();
    cy.findByTestId('sortButton-lastInterviewDate').click();
    cy.findByTestId('sortButton-lastInterviewDate').click();
    cy.findAllByTestId('employerCard').first().contains('Мумми-троль ОAО');
  });
});
