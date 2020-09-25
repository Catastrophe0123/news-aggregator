/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});

describe('working with cypress', () => {
	beforeEach('visit the server', () => {
		cy.server();

		cy.route('**/headlines*', 'fixture:news.json');
		cy.route('**/**category=**', 'fixture:news.json');

		// cy.visit('http://localhost:3000/news-aggregator');
	});

	it('loads headlines', () => {
		cy.visit('http://localhost:3000/news-aggregator');

		cy.contains('Headlines');
	});

	it('copies link', () => {
		// expect(true).equal(true);
		// get('');
		cy.get(
			':nth-child(1) > .border-gray-500 > .custom-grid > :nth-child(1) > .py-2 > span.mx-2 > span.cursor-pointer > .fas'
		)
			.as('copy')
			.click();

		cy.get('@copy').should('have.class', 'text-blue-600');
	});

	it('opens more options', () => {
		cy.get(
			':nth-child(1) > .border-gray-500 > .custom-grid > :nth-child(1) > .py-2 > span.mx-2 > .mx-2 > .fas'
		)
			.as('options')
			.click();

		cy.get('.rc-dropdown-menu');
	});

	it('hides articles', () => {
		cy.get(
			':nth-child(1) > .border-gray-500 > .custom-grid > :nth-child(1) > .py-2 > span.mx-2 > .mx-2 > .fas'
		)
			.as('options')
			.click({ force: true });
		cy.contains('Hide this story').click({ force: true });
		cy.should(
			'not.exist',
			cy.contains(
				"Seagate's 1TB Game Drive for Xbox Series X, Series S costs $220 - Engadget"
			)
		);
	});

	it('goes to headlines', () => {
		cy.contains('News Aggregatore').click();

		cy.url().should('equal', 'http://localhost:3000/headlines');
	});

	it('goes to news page', () => {
		cy.visit('http://localhost:3000/news-aggregator');
		cy.get(
			':nth-child(1) > .border-gray-500 > .custom-grid > :nth-child(1) > .py-2 > span.mx-2 > .mx-2 > .fas'
		)
			.as('options')
			.click();

		cy.get('[aria-disabled="false"] > .cursor-pointer')
			.trigger('mouseover')
			.click({ force: true });
		cy.url().should(
			'equal',
			'http://localhost:3000/search?sources=engadget'
		);
	});

	it('goes to search page when tag is clicked', () => {
		cy.visit('http://localhost:3000/news-aggregator');
		cy.get(
			'[href="/search?q=Engadget Xbox Series X"] > .cursor-pointer'
		).click();

		cy.url().should(
			'equal',
			'http://localhost:3000/search?q=Engadget%20Xbox%20Series%20X'
		);
	});

	it('searches for item', () => {
		cy.visit('http://localhost:3000/news-aggregator');
		cy.get('.shadow-sm > .flex > .px-3')
			.type('hello world')
			.should('have.value', 'hello world');

		cy.get('.shadow-sm > .flex > .px-3').clear().type('water{enter}');
		cy.url().should('equal', 'http://localhost:3000/search?q=water');
	});

	it('shows error for bad search', () => {
		cy.visit('http://localhost:3000/news-aggregator');
		cy.get('.shadow-sm > .flex > .px-3')
			.clear()
			.type('qiudqdudhqwuwdoqwduqwhd{enter}');
		cy.url().should(
			'equal',
			'http://localhost:3000/search?q=qiudqdudhqwuwdoqwduqwhd'
		);
		cy.contains('Nothing to show here. Please try a different search term');
	});

	it('opens sidebar', () => {
		cy.visit('http://localhost:3000/news-aggregator');
		cy.get('.sidenav').should('have.css', 'width', '0px');

		// cy.get('.flex.items-center > .cursor-pointer').click();

		cy.openSidebar();

		cy.get('.sidenav').should('not.have.css', 'width', '0px');

		cy.get('.sidenav').should('have.css', 'width', '270px');
	});
});

describe('sidebar tests', () => {
	beforeEach(() => {
		cy.server();

		cy.route('**/headlines*', 'fixture:news.json');
		cy.route('**/**category=**', 'fixture:news.json');
	});

	it('opens sidebar', () => {
		cy.get('.sidenav').should('have.css', 'width', '270px');
	});

	it('goes to categories page', () => {
		cy.visit('http://localhost:3000/news-aggregator');
		cy.get('[href="/topics?category=business"]').click({ force: true });
		cy.url().should('eq', 'http://localhost:3000/topics?category=business');
	});
});
