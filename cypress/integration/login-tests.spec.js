/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});

describe('login stuff', { retries: 2 }, () => {
	beforeEach('visit the server', () => {
		cy.server();
		cy.window().then((win) => {});
		cy.route('**/headlines*', 'fixture:news.json');
		cy.route('**/**category=**', 'fixture:news.json');
		cy.get('asdq').type();
		cy.get('asd').eq;
		// cy.visit('http://localhost:3000/news-aggregator');
	});

	it('loads headlines', () => {
		cy.visit('http://localhost:3000/news-aggregator');

		cy.contains('Headlines');
	});

	it('opens login modal', () => {
		cy.get('.border > .fas').click();
		// cy.get("asd").should("have.css", )
		// cy.get('asdqwe').should('have.attr', );
		cy.get('.Modal').should('exist');
	});

	it('login: wrong email id', () => {
		cy.get('form > :nth-child(1) > .px-3').type('water');

		cy.get('form > :nth-child(2) > .px-3').type('qweqweqeqwe');

		cy.get('.bg-gray-900').click();

		cy.contains('email must be valid');
	});

	it('login: wrong password length', () => {
		cy.get('form > :nth-child(1) > .px-3').clear().type('qwe@gmail.com');

		cy.get('form > :nth-child(2) > .px-3').clear().type('qwe');

		cy.get('.bg-gray-900').click();
		cy.contains('password must be atleast 4 letters long');
	});

	it('login: wrong credentials', () => {
		cy.get('form > :nth-child(1) > .px-3').clear().type('jkl@gmail.com');

		cy.get('form > :nth-child(2) > .px-3').clear().type('qweqweqwe');

		cy.get('.bg-gray-900').click();

		cy.contains('User does not exist');

		// cy.get(".Modal").should("not.exist");
	});

	it('switches to create account', () => {
		cy.get('.Modal').contains('Create a new Account').click();
		// cy.get('.Modal').should('contain.text', 'SIGN UP');

		cy.get('.bg-gray-900').contains('Sign Up');
	});

	it('switches to sign in', () => {
		cy.get('.Modal').contains('Already have an Account').click();
		// cy.get('.Modal').should('contain', 'SIGN IN');

		cy.get('.bg-gray-900').contains('Sign In');
	});

	it('logs in', () => {
		cy.get('form > :nth-child(1) > .px-3').clear().type('qwerty@gmail.com');

		cy.get('form > :nth-child(2) > .px-3').clear().type('qwerty');

		cy.get('.bg-gray-900').click();

		cy.get('.Modal').should('not.exist');

		cy.get('.h-16 > :nth-child(3) > .border').contains('QW');
	});
});
