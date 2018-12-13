// https://docs.cypress.io/api/introduction/api.html

describe('Test Home Page', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('Media Manager')
    cy.get('.media-home')
    cy.get('.media-toolbar')
    cy.get('#media-navbar')
    cy.get('#media-content')
    cy.get('#media-tool')
    cy.get('#media-settings ')
    cy.get('#media-tool')
    cy.get('#media-rename')
    cy.get('#media-confirm-model ')
    cy.get('#media-create-folder')
    cy.get('#media-online')
  })
})

describe('Test About', () => {
  it('Visits the app about url', () => {
    cy.visit('#/about')
    cy.contains('This is an about page')
  })
})
