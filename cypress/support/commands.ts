declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

/** Logs in through the OrangeHRM login form. */
Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("/web/index.php/auth/login");
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get(".orangehrm-login-button").click();
});

/** Logs out through the application navigation menu. */
Cypress.Commands.add("logout", () => {
  cy.get(".oxd-userdropdown-tab").click();
  cy.contains("a", "Logout").click();
});

export {};
