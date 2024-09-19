describe('Check if create profile page renders the correct components ', () => {
  beforeEach(() => {
    cy.login('Usuario02@testando.com', '#DNC569teste')
    cy.visit('http://localhost:5173/perfil')
  })

  it('Should display profile form', () => {
    cy.get('form').should('be.visible')
    cy.get('input[type="text"]').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="tel"]').should('be.visible')
    cy.get('#update-profile').should('be.visible')
    cy.get('#delete-profile').should('be.visible')
    
  })
  
  it('Should display theme swich button', () => {
    cy.get('#theme-swich').should('be.visible')
   
  })

    it('Should display logout button and logout flow with', () => {
      cy.get('#logout').click()
      cy.url().should('include', '/')
    })

 
})
