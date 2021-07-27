// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('signUp',() => {
  cy.request({
    method: "POST",
    url: "http://192.168.18.9:3333/users",
    body: {
      username: 'User',
      email: "user@email.com",
      password: "123456",
      password_confirmation: "123456",
    },
  }).then((response) => {
    // expect(response.body.user_id.id).is.not.null;
    // expect(response.body.token.token).is.not.null;
    Cypress.env("email", "user@email.com");
    Cypress.env("password", "123456");
  });
})