import ApiHelper from "@cypress/support/helpers/api-helpers";

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
  profilePictureInput: ".oxd-file-input",
};

/**
 * Page Object Model for the Add Employee page.
 */
export default class AddEmployeeDialog {
  /**
   * Get the first name input field.
   * Waits for the form loader to disappear before returning the input.
   * @returns The first name input element.
   */
  static getFirstNameInput() {
    cy.get(".oxd-form-loader", { timeout: 10000 }).should("not.exist");
    return cy.get(LOCATORS.firstNameInput);
  }

  /**
   * Get the middle name input field.
   * @returns The middle name input element.
   */
  static getMiddleNameInput() {
    return cy.get(LOCATORS.middleNameInput);
  }

  /**
   * Get the last name input field.
   * @returns The last name input element.
   */
  static getLastNameInput() {
    return cy.get(LOCATORS.lastNameInput);
  }

  /**
   * Get the employee ID input field.
   * @returns The employee ID input element.
   */
  static getEmployeeIdInput() {
    return cy
      .contains("label", LOCATORS.employeeIdLabel)
      .parents(LOCATORS.inputGroup)
      .find("input");
  }

  /**
   * Get the create login details switch.
   * @returns The create login details switch element.
   */
  static getCreateLoginSwitch() {
    return cy.get(LOCATORS.createLoginSwitch);
  }

  /**
   * Get the username input field.
   * @returns The username input element.
   */
  static getUsernameInput() {
    return cy.get(LOCATORS.usernameInput).eq(5);
  }

  /**
   * Get the password input field.
   * @returns The password input element.
   */
  static getPasswordInput() {
    return cy.get(LOCATORS.passwordInput).eq(0);
  }

  /**
   * Get the confirm password input field.
   * @returns The confirm password input element.
   */
  static getConfirmPasswordInput() {
    return cy.get(LOCATORS.passwordInput).eq(1);
  }

  /**
   * Get the Save button.
   * @returns The Save button element.
   */
  static getSaveButton() {
    return cy.get(LOCATORS.saveButton).contains("Save");
  }

  /**
   * Type the employee's first name.
   * @param {string} firstName - The employee's first name.
   */
  static typeFirstName(firstName: string) {
    this.getFirstNameInput().type(firstName);
  }

  /**
   * Type the employee's middle name.
   * @param {string} middleName - The employee's middle name.
   */
  static typeMiddleName(middleName: string) {
    this.getMiddleNameInput().type(middleName);
  }

  /**
   * Type the employee's last name.
   * @param {string} lastName - The employee's last name.
   */
  static typeLastName(lastName: string) {
    this.getLastNameInput().type(lastName);
  }

  /**
   * Enter the employee ID.
   * @param {string} employeeId - The employee ID.
   */
  static typeEmployeeId(employeeId: string) {
    this.getEmployeeIdInput().clear().type(employeeId);
  }

  /**
   * Enable the create login details option.
   */
  static enableCreateLoginDetails() {
    this.getCreateLoginSwitch().click();
  }

  /**
   * Type the employee's username.
   * @param {string} username - The login username.
   */
  static typeUsername(username: string) {
    this.getUsernameInput().type(username);
  }

  /**
   * Type the employee's password.
   * @param {string} password - The login password.
   */
  static typePassword(password: string) {
    this.getPasswordInput().type(password);
  }

  /**
   * Type the employee's confirmation password.
   * @param {string} password - The confirmation password.
   */
  static typeConfirmPassword(password: string) {
    this.getConfirmPasswordInput().type(password);
  }

  /**
   * Upload a profile picture for the employee.
   * @param {string} filePath - The path to the profile picture.
   */
  static uploadProfilePicture(filePath: string) {
    cy.get(LOCATORS.profilePictureInput).selectFile(filePath, {
      force: true,
    });
  }

  /**
   * Click the Save button.
   */
  static clickSave() {
    this.getSaveButton().click();
  }

  /**
   * Fill the Add Employee form and save the employee.
   * Optionally uploads a profile picture before saving.
   * @param {object} data - The employee data.
   * @param {string} data.firstName - The employee's first name.
   * @param {string} data.middleName - The employee's middle name.
   * @param {string} data.lastName - The employee's last name.
   * @param {string} data.employeeId - The employee ID.
   * @param {string} data.username - The login username.
   * @param {string} data.password - The login password.
   * @param {string} [data.profilePicturePath] - Optional path to the profile picture.
   */
  static createEmployee(data: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
    username: string;
    password: string;
    profilePicturePath?: string;
  }) {
    this.typeFirstName(data.firstName);
    this.typeMiddleName(data.middleName);
    this.typeLastName(data.lastName);
    this.typeEmployeeId(data.employeeId);

    if (data.profilePicturePath) {
      this.uploadProfilePicture(data.profilePicturePath);
    }

    this.enableCreateLoginDetails();
    this.typeUsername(data.username);
    this.typePassword(data.password);
    this.typeConfirmPassword(data.password);

    ApiHelper.intercept("POST", "**/api/v2/pim/employees", "createEmployee");

    ApiHelper.intercept(
      "GET",
      "**/api/v2/pim/employees/*/personal-details",
      "personalDetails",
    );

    this.clickSave();
    ApiHelper.wait("createEmployee");
    ApiHelper.wait("personalDetails");
  }
}
