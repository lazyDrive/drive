// https://docs.cypress.io/api/introduction/api.html

describe('Test Home Page', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('#app', 'Done!')
  })
})
