describe('Login Flow Correct Credentials', () => {

  beforeEach(()=>{
    cy.visit('http://localhost:5173/')
  })

    it('Should display login form', () => {
      cy.get('form').should('be.visible')
    })
   
    it('Should login with valid credentials', () => {
      cy.get('input[type="email"]').type('Usuario02@testando.com')
      cy.get('input[type="password"]').type('#DNC569teste')
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/home')
      cy.get('header').should('be.visible')


    })
})


describe('Login Flow Invalid Credentials', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('Should display login form', () => {
    cy.get('form').should('be.visible')
  })

  it('Should login with valid Invalid Credentials', () => {
    cy.get('input[type="email"]').type('Usuario526392@testando.com')
    cy.get('input[type="password"]').type('#DNC569teste')
    cy.get('button[type="submit"]').click()
    cy.contains('Email e/ou senha inválidos').should('be.visible')
  })
})