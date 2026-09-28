import { LOCATORS } from "@cypress/support/helpers/constants";

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

/** Logs in through the OrangeHRM login form. */
Cypress.Commands.add("login", (username = "Admin", password = "admin123") => {
  cy.visit("/web/index.php/auth/login");
  cy.get(LOCATORS.usernameField).type(username);
  cy.get(LOCATORS.passwordField).type(password);
  cy.get(LOCATORS.loginButton).click();
});

/** Logs out through the application navigation menu. */
Cypress.Commands.add("logout", () => {
  cy.get(".oxd-userdropdown-tab").click();
  cy.contains("a", "Logout").click();
});

export {};
