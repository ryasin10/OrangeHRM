const LOCATORS = {
  userDropdown: ".oxd-userdropdown-tab",
  logoutLink: "a",
};
/**
 * Page Object Model for the application navigation bar.
 */
export default class NavbarPage {
  /** Verifies that the user dropdown is visible. */
  static userDropdownVisible() {
    cy.get(LOCATORS.userDropdown).should("be.visible");
  }
  /** Returns the user dropdown control. */
  static getUserDropdown() {
    return cy.get(LOCATORS.userDropdown);
  }
  /** Returns the Logout link. */
  static getLogoutLink() {
    return cy.contains(LOCATORS.logoutLink, "Logout");
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
