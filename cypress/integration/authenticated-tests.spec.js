/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});

describe('logs in', { retries: 2 }, () => {
	beforeEach('visit the server', () => {
		cy.server();
		// cy.route('POST', '**/user', {}).as('saving');

		cy.route('**/headlines*', 'fixture:news.json');
		cy.route('**/**category=**', 'fixture:news.json');
	});

	it('Opens preferences', () => {
		cy.visit('http://localhost:3000/news-aggregator');

		cy.login();

		cy.openSidebar();

		cy.contains('Preferences').click();

		cy.get('.Modal').should('exist');
	});

	it('changes to grid', () => {
		cy.get(
			':nth-child(2) > .w-40 > .basic-single > .select__control > .select__value-container'
		).click();
		cy.contains('Grid').click({ force: true });

		cy.contains('Save Changes').click({ force: true }).as('saving');

		cy.wait(3000);

		cy.get('.customGrid').should('exist');
	});

	it('changes to List', () => {
		cy.openSidebar();

		cy.contains('Preferences').click();

		cy.get('.Modal').should('exist');

		cy.get(
			':nth-child(2) > .w-40 > .basic-single > .select__control > .select__value-container'
		)
			.click({ force: true })
			.type('List{enter}');
		cy.contains('Save Changes').click({ force: true });

		cy.get('.customGrid').should('not.exist');
	});
});

describe('saved searches', () => {
	beforeEach('setup the server', () => {
		cy.server();
		// cy.route('POST', '**/user', {}).as('saving');

		cy.route('**/headlines*', 'fixture:news.json');
		cy.route('**/**category=**', 'fixture:news.json');
		cy.route('**/search/save', 'fixture:savedSearches.json');
	});

	it('goes to site', () => {
		// cy.visit('http://localhost:3000/news-aggregator');

		// cy.login();

		cy.openSidebar();

		cy.contains('Saved Searches').click();

		cy.get('.search-grid').should('exist');
	});

	it('dismisses sidebar', () => {
		cy.get('.BackDrop').click();

		cy.get('.sidenav').should('have.css', 'width', '0px');
	});

	it('deletes saved searches', () => {
		cy.get('.search-grid > :nth-child(1) > .cursor-pointer')
			.get('.fas.fa-trash')
			.eq(0)
			.click();

		cy.contains('Lebanon information minister').should('not.exist');
	});

	it('goes to search page when clicking on a search', () => {
		cy.contains('pubg').click();

		cy.url().should('eq', 'http://localhost:3000/search?q=pubg');
	});
});
