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
// Cypress.Commands.add("login", (email, password) => { ... })

Cypress.Commands.add('openSidebar', () => {
	cy.get('.flex.items-center > .cursor-pointer').click();
});

Cypress.Commands.add('login', () => {
	cy.get('.border > .fas').click();

	cy.get('.Modal').should('exist');

	cy.get('form > :nth-child(1) > .px-3').clear().type('qwerty@gmail.com');

	cy.get('form > :nth-child(2) > .px-3').clear().type('qwerty');

	cy.get('.bg-gray-900').click();

	cy.get('.Modal').should('not.exist');
	// cy.get("qdwqw").should("be.visible")
	cy.get('.h-16 > :nth-child(3) > .border').contains('QW');
});

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
