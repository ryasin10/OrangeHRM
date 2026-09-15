const LOCATORS = {
  firstNameInput: 'input[name="firstName"]',
  middleNameInput: 'input[name="middleName"]',
  lastNameInput: 'input[name="lastName"]',
  employeeIdLabel: "Employee Id",
  inputGroup: ".oxd-input-group",
  createLoginSwitch: ".oxd-switch-input",
  usernameInput: ".oxd-input--active",
  passwordInput: 'input[type="password"]',
  saveButton: 'button[type="submit"]',
};

export default class AddEmployeePage {
  static getFirstNameInput() {
    return cy.get(LOCATORS.firstNameInput);
  }

  static getMiddleNameInput() {
    return cy.get(LOCATORS.middleNameInput);
  }

  static getLastNameInput() {
    return cy.get(LOCATORS.lastNameInput);
  }

  static getEmployeeIdInput() {
    return cy
      .contains("label", LOCATORS.employeeIdLabel)
      .parents(LOCATORS.inputGroup)
      .find("input");
  }

  static getCreateLoginSwitch() {
    return cy.get(LOCATORS.createLoginSwitch);
  }

  static getUsernameInput() {
    return cy.get(LOCATORS.usernameInput).eq(5);
  }

  static getPasswordInput() {
    return cy.get(LOCATORS.passwordInput).eq(0);
  }

  static getConfirmPasswordInput() {
    return cy.get(LOCATORS.passwordInput).eq(1);
  }

  static getSaveButton() {
    return cy.get(LOCATORS.saveButton).contains("Save");
  }

  static interceptCreateEmployee() {
    cy.intercept("POST", "**/api/v2/pim/employees").as("createEmployee");
  }

  static interceptPersonalDetails() {
    cy.intercept("GET", "**/api/v2/pim/employees/*/personal-details").as(
      "personalDetails",
    );
  }

  static waitForCreateEmployee() {
    cy.wait("@createEmployee").its("response.statusCode").should("eq", 200);
  }

  static waitForPersonalDetailsLoad() {
    cy.wait("@personalDetails").its("response.statusCode").should("eq", 200);
  }

  static typeFirstName(firstName: string) {
    this.getFirstNameInput().type(firstName);
  }

  static typeMiddleName(middleName: string) {
    this.getMiddleNameInput().type(middleName);
  }

  static typeLastName(lastName: string) {
    this.getLastNameInput().type(lastName);
  }

  static typeEmployeeId(employeeId: string) {
    this.getEmployeeIdInput().clear().type(employeeId);
  }

  static enableCreateLoginDetails() {
    this.getCreateLoginSwitch().click();
  }

  static typeUsername(username: string) {
    this.getUsernameInput().type(username);
  }

  static typePassword(password: string) {
    this.getPasswordInput().type(password);
  }

  static typeConfirmPassword(password: string) {
    this.getConfirmPasswordInput().type(password);
  }

  static clickSave() {
    this.getSaveButton().click();
  }

  static createEmployee(data: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
    username: string;
    password: string;
  }) {
    this.typeFirstName(data.firstName);
    this.typeMiddleName(data.middleName);
    this.typeLastName(data.lastName);
    this.typeEmployeeId(data.employeeId);
    this.enableCreateLoginDetails();
    this.typeUsername(data.username);
    this.typePassword(data.password);
    this.typeConfirmPassword(data.password);

    this.interceptCreateEmployee();
    this.interceptPersonalDetails();
    this.clickSave();
    this.waitForCreateEmployee();

    cy.url({ timeout: 10000 }).should("include", "/pim/viewPersonalDetails/");
    this.waitForPersonalDetailsLoad();
  }
}
