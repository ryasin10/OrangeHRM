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
    return this;
  }

  static interceptPersonalDetails() {
    cy.intercept("GET", "**/api/v2/pim/employees/*/personal-details").as(
      "personalDetails",
    );
    return this;
  }

  static waitForCreateEmployee() {
    cy.wait("@createEmployee").its("response.statusCode").should("eq", 200);
    return this;
  }

  static waitForPersonalDetailsLoad() {
    cy.wait("@personalDetails").its("response.statusCode").should("eq", 200);
    return this;
  }

  static typeFirstName(firstName: string) {
    this.getFirstNameInput().type(firstName);
    return this;
  }

  static typeMiddleName(middleName: string) {
    this.getMiddleNameInput().type(middleName);
    return this;
  }

  static typeLastName(lastName: string) {
    this.getLastNameInput().type(lastName);
    return this;
  }

  static typeEmployeeId(employeeId: string) {
    this.getEmployeeIdInput().clear().type(employeeId);
    return this;
  }

  static enableCreateLoginDetails() {
    this.getCreateLoginSwitch().click();
    return this;
  }

  static typeUsername(username: string) {
    this.getUsernameInput().type(username);
    return this;
  }

  static typePassword(password: string) {
    this.getPasswordInput().type(password);
    return this;
  }

  static typeConfirmPassword(password: string) {
    this.getConfirmPasswordInput().type(password);
    return this;
  }

  static clickSave() {
    this.getSaveButton().click();
    return this;
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
    return this;
  }
}
