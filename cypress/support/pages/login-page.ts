const LOCATORS = {
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  loginButton: ".orangehrm-login-button",
  alertMessage: ".oxd-alert-content-text",
  inputGroup: ".oxd-input-group",
  fieldErrorMessage: ".oxd-input-field-error-message",
};

export default class LoginPage {
  static visit() {
    cy.visit("/web/index.php/auth/login");
  }

  static enterUsername(username: string) {
    cy.get(LOCATORS.usernameInput).type(username);
    return this;
  }

  static enterPassword(password: string) {
    cy.get(LOCATORS.passwordInput).type(password);
    return this;
  }

  static clickLogin() {
    cy.get(LOCATORS.loginButton).click();
    return this;
  }

  static login(username: string, password: string) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
    return this;
  }

  static getAlertMessage() {
    return cy.get(LOCATORS.alertMessage);
  }

  static getUsernameError() {
    return cy.get(LOCATORS.inputGroup).eq(0).find(LOCATORS.fieldErrorMessage);
  }

  static getPasswordError() {
    return cy.get(LOCATORS.inputGroup).eq(1).find(LOCATORS.fieldErrorMessage);
  }
}
