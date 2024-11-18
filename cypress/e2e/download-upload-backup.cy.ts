describe('Download and upload backup', () => {
    beforeEach(() => {
         cy.visit('http://localhost:5173')
    })

    after(() => {
        cy.clearDownloads()
    })

  it('should download and upload backup', () => {

      cy.createEmployer({companyName: 'Рога и копыта ООО', description: 'Мутные типы', hrName: 'Вася', contacts: 'test@test.ru'})

      cy.createInterview({companyName:'Рога и копыта ООО',date: '2020-01-01T10:00:00', description: 'Первая встреча', status: 'В ожидании'})
      cy.createInterview({companyName:'Рога и копыта ООО',date: '2021-01-01T10:00:00', description: 'Тестовое описание прошедшего интервью', status: 'Завершено'})


      cy.createEmployer({companyName: 'СберКо', description: 'Финтех', hrName: 'Maша', contacts: '88005553535'})
      cy.createInterview({companyName: 'СберКо',  date: '2022-01-01T10:00:00', description: 'Первая встреча', status: 'Завершено'})
      cy.createInterview({companyName: 'СберКо',date: '2022-03-03T10:00:00', description: 'Техническое интервью ', status: 'Завершено'})
      cy.createInterview({companyName: 'СберКо',date: '2022-03-03T10:00:00', description: 'Техническое интервью ', status: 'Завершено'})
      cy.createInterview({companyName: 'СберКо',date: '2022-03-04T10:00:00', description: 'Знакомство c коммандой и оффер', status: 'Принят'})


      cy.findByTestId("downloadBackup").click()
      cy.verifyDownload("job-search-tracker-backup.json",{contains:true})
  });



});
