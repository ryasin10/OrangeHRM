import { LOCATORS } from "@cypress/support/helpers/constants";
import WebElementHandler from "@cypress/support/helpers/web-element-handler";

/**
 * Page Object Model for the application navigation bar.
 */
export default class NavbarPage {
  /** Verifies that the user dropdown is visible. */
  static userDropdownVisible() {
    WebElementHandler.verifyElement(LOCATORS.userDropdown);
  }
  /** Returns the user dropdown control. */
  static getUserDropdown() {
    return cy.get(LOCATORS.userDropdown);
  }
  /** Returns the Logout link. */
  static getLogoutLink() {
    return cy.get(LOCATORS.logoutLink);
  }
  /** Opens the user dropdown. */
  static clickUserDropdown() {
    this.getUserDropdown().click();
  }
  /** Clicks the Logout link. */
  static clickLogout() {
    this.getLogoutLink().click();
  }
  /** Logs out through the shared Cypress command. */
  static logout() {
    cy.logout();
  }
  /** Verifies that the login page is displayed. */
  static verifyLoggedOut() {
    cy.url().should("include", "/auth/login");
  }
}
