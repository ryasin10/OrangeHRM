const LOCATORS = {
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  loginButton: ".orangehrm-login-button",
  alertMessage: ".oxd-alert-content-text",
  inputGroup: ".oxd-input-group",
  fieldErrorMessage: ".oxd-input-field-error-message",
};
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
    cy.get(LOCATORS.usernameInput, { timeout: 10000 }).type(username);
  }
  /** Enters a password in the login form. */
  static enterPassword(password: string) {
    cy.get(LOCATORS.passwordInput, { timeout: 10000 }).type(password);
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
   * Logs in using the Cypress custom command.
   * @param {string} username - the employee username
   * @param {string} password - the employee password
   */
  static loginWithCommand(username: string, password: string) {
    cy.login(username, password);
  }
  /** Verifies the displayed login error message. */
  static verifyErrorMessage(expectedMessage: string) {
    cy.get(LOCATORS.alertMessage).should("have.text", expectedMessage);
  }
  /** Verifies that a login error message is visible. */
  static verifyErrorMessageIsShown() {
    cy.get(LOCATORS.alertMessage).should("exist");
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
