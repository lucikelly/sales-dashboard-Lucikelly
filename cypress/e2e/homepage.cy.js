describe('Check if create profile page renders the correct components ', () => {
  beforeEach(() => {
    cy.login('Usuario02@testando.com', '#DNC569teste')
    cy.visit('http://localhost:5173/home')
  })

  it('Should display total sales', () => {
    cy.get('#total-sales').should('be.visible')
  })

  it('Should display month goals', () => {
    cy.get('#month-goals').should('be.visible')
  })
  it('Should display total leads', () => {
    cy.get('#total-leads').should('be.visible')
  })
  it('Should display month sales chart', () => {
    cy.get('#month-sales-chart').should('be.visible')
  })

  it('Should display sales stars', () => {
    cy.get('#sales-stars').should('be.visible')
  })
  it('Should display news', () => {
    cy.get('#news').should('be.visible')
  })

  it('Should display year sales chart', () => {
    cy.get('#year-sales-chart').should('be.visible')
  })
})
