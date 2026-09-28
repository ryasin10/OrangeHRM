import { LOCATORS } from "@cypress/support/helpers/constants";
import WebElementHandler from "@cypress/support/helpers/web-element-handler";

const ALERT_MESSAGE = ".oxd-alert-content-text";
const ERROR_MESSAGE = ".oxd-input-field-error-message";

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
    cy.get(LOCATORS.usernameField, { timeout: 10000 }).type(username);
  }
  /** Enters a password in the login form. */
  static enterPassword(password: string) {
    cy.get(LOCATORS.passwordField, { timeout: 10000 }).type(password);
  }
  /** Submits the login form. */
  static clickLogin() {
    cy.get(LOCATORS.loginButton).click();
  }
  /** Logs in with the supplied credentials. */
  static login(username: string, password: string) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }
  /**
   * Logs in using the Cypress custom command. Defaults to the Admin account
   * so callers don't need to pass credentials explicitly every time.
   * @param {string} [username] - the employee username
   * @param {string} [password] - the employee password
   */
  static loginWithCommand(
    username: string = "Admin",
    password: string = "admin123",
  ) {
    cy.login(username, password);
  }
  /** Verifies the displayed login error message. */
  static verifyErrorMessage(expectedMessage: string) {
    cy.get(ALERT_MESSAGE).should("have.text", expectedMessage);
  }
  /** Verifies that a login error message is visible. */
  static verifyErrorMessageIsShown() {
    WebElementHandler.verifyElement(ALERT_MESSAGE, "exist");
  }
  /** Verifies the required error for the username field. */
  static getUsernameError() {
    return cy
      .get(LOCATORS.inputGroup)
      .eq(0)
      .find(ERROR_MESSAGE)
      .should("have.text", "Required");
  }
  /** Verifies the required error for the password field. */
  static getPasswordError() {
    return cy
      .get(LOCATORS.inputGroup)
      .eq(1)
      .find(ERROR_MESSAGE)
      .should("have.text", "Required");
  }
}
