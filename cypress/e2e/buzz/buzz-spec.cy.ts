describe("Buzz Page Tests", () => {
  beforeEach(() => {
    cy.fixture("buzzData").then((data) => {
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
      cy.get(".orangehrm-login-form").find('input[placeholder="Username"]').type(data.username);
      cy.get(".orangehrm-login-form").find('input[placeholder="Password"]').type(data.password);
      cy.get(".orangehrm-login-form").find("button").contains("Login").click();
    });
  });

 it('TC10: Verify user can create a post using fixture data', () => {
  cy.fixture('buzzData').then((data) => {

    cy.get('.oxd-main-menu-item').contains('Buzz').click();
    cy.intercept('POST', '**/web/index.php/api/v2/buzz/posts').as('createPost');
    cy.get('.oxd-buzz-post-input').type(data.postText);
    cy.contains('button', 'Post').click();
    cy.wait('@createPost').its('response.statusCode').should('eq', 200);
    cy.reload();
    cy.get('.orangehrm-buzz-post-body-text').first()
      .should('be.visible').and('have.text', data.postText);
  });
});
  });
