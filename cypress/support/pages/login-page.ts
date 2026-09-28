import { LOCATORS } from "@cypress/support/helpers/constants";
import WebElementHandler from "@cypress/support/helpers/web-element-handler";

/**
 * Page Object Model for the OrangeHRM login page.
 */
export default class LoginPage {
  /** Opens the login page. */
  static visit() {
    cy.visit("/web/index.php/auth/login");
  }

  /** Enters a username in the login form. */
  static enterUsername(username: string) {
    cy.get(LOCATORS.usernameInput).type(username);
    return this;
  }

  /** Enters a password in the login form. */
  static enterPassword(password: string) {
    cy.get(LOCATORS.passwordInput).type(password);
    return this;
  }

  /** Submits the login form. */
  static clickLogin() {
    cy.get(LOCATORS.loginButton).click();
    return this;
  }

  /** Logs in with the supplied credentials. */
  static login(username: string, password: string) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
    return this;
  }

  /**
   * Logs in using the Cypress custom command.
   * @param {string} [username] - the employee username.
   * @param {string} [password] - the employee password.
   */
  static loginWithCommand(
    username: string = "Admin",
    password: string = "admin123",
  ) {
    cy.login(username, password);
  }

  /** Verifies the displayed login error message. */
  static verifyErrorMessage(expectedMessage: string) {
    cy.get(LOCATORS.alertMessage).should("have.text", expectedMessage);
  }

  /** Verifies that a login error message is visible. */
  static verifyErrorMessageIsShown() {
    WebElementHandler.verifyElement(LOCATORS.alertMessage, "exist");
  }

  /** Verifies the required error for the username field. */
  static getUsernameError() {
    return cy
      .get(LOCATORS.inputGroup)
      .eq(0)
      .find(LOCATORS.fieldErrorMessage)
      .should("have.text", "Required");
  }

  /** Verifies the required error for the password field. */
  static getPasswordError() {
    return cy
      .get(LOCATORS.inputGroup)
      .eq(1)
      .find(LOCATORS.fieldErrorMessage)
      .should("have.text", "Required");
  }
}
