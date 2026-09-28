import ApiHelper, { HTTP_METHODS } from "@cypress/support/helpers/api-helpers";
import { LOCATORS, API_URLS } from "@cypress/support/helpers/constants";
import WebElementHandler from "@cypress/support/helpers/web-element-handler";
import type { INewEmployeeData } from "@cypress/support/types/employee-info";

/** CSS selectors used in the Add Employee form. */
const SELECTORS = {
  formLoader: ".oxd-form-loader",
  firstNameInput: 'input[name="firstName"]',
  middleNameInput: 'input[name="middleName"]',
  lastNameInput: 'input[name="lastName"]',
  createLoginSwitch: ".oxd-switch-input",
} as const;

/** Field labels used to locate inputs by their label text. */
const LABELS = {
  employeeId: "Employee Id",
  username: "Username",
  password: "Password",
  confirmPassword: "Confirm Password",
} as const;

/** Button texts used in the Add Employee form. */
const BUTTON_TEXTS = {
  save: "Save",
} as const;

/** Timeouts (in milliseconds) used in the Add Employee form. */
const TIMEOUTS = {
  formLoader: 10000,
} as const;

/**
 * Page Object Model for the Add Employee form.
 */
export default class AddEmployeeDialog {
  /**
   * Uploads a profile picture to the Add Employee form.
   *
   * @param filePath - Path of the image file to upload.
   */
  static uploadProfilePicture(filePath: string) {
    cy.get(LOCATORS.fileInput).selectFile(filePath, { force: true });
  }

  /**
   * Fills the Add Employee form, submits it, and waits for the related API calls.
   *
   * @param data - Employee data used to fill the form.
   * @param createEmployeeAlias - Alias for the intercepted create-employee request.
   * @param personalDetailsAlias - Alias for the intercepted personal-details request.
   */
  static createEmployee(
    data: INewEmployeeData,
    createEmployeeAlias: string,
    personalDetailsAlias: string,
  ) {
    cy.get(SELECTORS.formLoader, { timeout: TIMEOUTS.formLoader }).should(
      "not.exist",
    );

    const nameFields = [
      [SELECTORS.firstNameInput, data.firstName],
      [SELECTORS.middleNameInput, data.middleName],
      [SELECTORS.lastNameInput, data.lastName],
    ] as const;

    nameFields.forEach(([locator, value]) =>
      WebElementHandler.type(locator, value),
    );
    WebElementHandler.typeField(LABELS.employeeId, data.employeeId);

    if (data.profilePicturePath) {
      this.uploadProfilePicture(data.profilePicturePath);
    }

    cy.get(SELECTORS.createLoginSwitch).click();

    const loginFields = [
      [LABELS.username, data.username],
      [LABELS.password, data.password],
      [LABELS.confirmPassword, data.password],
    ] as const;

    loginFields.forEach(([label, value]) =>
      WebElementHandler.typeField(label, value),
    );

    ApiHelper.interceptCreateEmployee(createEmployeeAlias);
    ApiHelper.intercept(
      HTTP_METHODS.GET,
      API_URLS.personalDetails,
      personalDetailsAlias,
    );

    cy.get(LOCATORS.submitButton).contains(BUTTON_TEXTS.save).click();
    ApiHelper.wait(createEmployeeAlias);
    ApiHelper.wait(personalDetailsAlias);
  }
}
