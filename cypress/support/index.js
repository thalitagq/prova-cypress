// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
  Cypress.env("email", "user@email.com");
  Cypress.env("password", "123456");

before(() => {
   cy.log(Cypress.env("email"));
  if (!Cypress.env('email')) {
    cy.log('aqui');
    cy.signUp();
  }
})