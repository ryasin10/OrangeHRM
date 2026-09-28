import { LOCATORS } from "@cypress/support/helpers/constants";

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

/** Logs in through the OrangeHRM login form (defaults to the Admin account). */
Cypress.Commands.add("login", (username = "Admin", password = "admin123") => {
  cy.visit("/web/index.php/auth/login");
  cy.get(LOCATORS.usernameInput).type(username);
  cy.get(LOCATORS.passwordInput).type(password);
  cy.get(LOCATORS.loginButton).click();
});

/** Logs out through the user dropdown in the navigation bar. */
Cypress.Commands.add("logout", () => {
  cy.get(LOCATORS.userDropdown).click();
  cy.contains("a", "Logout").click();
});

export {};
