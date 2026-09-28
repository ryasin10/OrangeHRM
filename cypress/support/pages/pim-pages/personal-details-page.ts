import ApiHelper, { HTTP_METHODS } from "@cypress/support/helpers/api-helpers";
import WebElementHandler from "@cypress/support/helpers/web-element-handler";
import { LOCATORS, API_URLS } from "@cypress/support/helpers/constants";
import type {
  IPersonalDetailsData,
  IEmployeeVerificationData,
} from "@cypress/support/types/employee-info";

/** Field labels used to locate inputs by their label text. */
const FIELD_LABELS = {
  fullName: "Employee Full Name",
  employeeId: "Employee Id",
  otherId: "Other Id",
  driversLicense: "Driver's License Number",
  licenseExpiry: "License Expiry Date",
  nationality: "Nationality",
  dateOfBirth: "Date of Birth",
  maritalStatus: "Marital Status",
  gender: "Gender",
};

/** CSS selectors used only on the Personal Details page. */
const PAGE_LOCATORS = {
  dateInput: ".oxd-date-input input",
  radioWrapper: ".oxd-radio-wrapper",
  radioInput: "input[type='radio']",
  saveButton: ".oxd-form-actions button[type='submit']",
  attachmentAddButton: ".orangehrm-action-header button",
  attachmentDialogContainer: ".orangehrm-card-container",
  attachmentTableBody: ".oxd-table-body",
  attachmentRow: ".oxd-table-card",
  attachmentDownloadIcon: ".oxd-table-cell-actions .bi-download",
};

/** API endpoint hit when an attachment is uploaded. */
const ATTACHMENTS_ENDPOINT =
  "**/api/v2/pim/employees/*/screen/personal/attachments";

/**
 * Page Object Model for the Personal Details page.
 */
export default class PersonalDetailsPage {
  /**
   * Returns the input fields inside the Employee Full Name group.
   */
  static getFullNameInputs() {
    return WebElementHandler.getInputGroup(FIELD_LABELS.fullName).find(
      LOCATORS.input,
    );
  }

  /**
   * Verifies the first, middle and last name inputs.
   * @param {string} firstName - the expected first name
   * @param {string} middleName - the expected middle name
   * @param {string} lastName - the expected last name
   */
  static verifyFullName(
    firstName: string,
    middleName: string,
    lastName: string,
  ) {
    [firstName, middleName, lastName].forEach((name, index) =>
      this.getFullNameInputs().eq(index).should("have.value", name),
    );
  }

  /**
   * Verifies the employee full name and Employee Id.
   * @param {string} firstName - the expected first name
   * @param {string} middleName - the expected middle name
   * @param {string} lastName - the expected last name
   * @param {string} employeeId - the expected employee id
   */
  static verifyIdentity(
    firstName: string,
    middleName: string,
    lastName: string,
    employeeId: string,
  ) {
    this.verifyFullName(firstName, middleName, lastName);
    WebElementHandler.verifyField(
      FIELD_LABELS.employeeId,
      LOCATORS.input,
      employeeId,
    );
  }

  /**
   * Returns the gender option matching the given gender.
   * @param {string} gender - the gender option to find
   */
  static getGenderOption(gender: string) {
    return WebElementHandler.getInputGroup(FIELD_LABELS.gender)
      .find(PAGE_LOCATORS.radioWrapper)
      .contains(gender);
  }

  /**
   * Returns the Save button in the Personal Details form.
   */
  static getSaveButton() {
    return cy.get(PAGE_LOCATORS.saveButton).contains("Save");
  }

  /**
   * Fills the Personal Details fields using the provided employee data.
   * @param {object} data - the Personal Details data
   * @param {string} data.otherId - the Other ID
   * @param {string} data.driversLicenseNumber - the driver's license number
   * @param {string} data.licenseExpiryDate - the license expiry date
   * @param {string} data.nationality - the nationality
   * @param {string} data.dateOfBirth - the date of birth
   * @param {string} data.maritalStatus - the marital status
   * @param {string} data.gender - the gender
   */
  static fillDetails(data: IPersonalDetailsData) {
    const fields = [
      [FIELD_LABELS.otherId, data.otherId, LOCATORS.input],
      [FIELD_LABELS.driversLicense, data.driversLicenseNumber, LOCATORS.input],
      [
        FIELD_LABELS.licenseExpiry,
        data.licenseExpiryDate,
        PAGE_LOCATORS.dateInput,
        false,
      ],
      [
        FIELD_LABELS.dateOfBirth,
        data.dateOfBirth,
        PAGE_LOCATORS.dateInput,
        false,
      ],
    ] as const;

    fields.forEach(([label, value, selector, clear = true]) =>
      WebElementHandler.typeField(label, value, selector, clear),
    );
    WebElementHandler.selectOption(FIELD_LABELS.nationality, data.nationality);
    WebElementHandler.selectOption(
      FIELD_LABELS.maritalStatus,
      data.maritalStatus,
    );
    this.getGenderOption(data.gender).click({ force: true });
  }

  /**
   * Verifies the employee's Personal Details. Responsible only for
   * assertions — callers build the data and this method just checks it.
   * @param {object} employee - the employee data to verify
   * @param {string} employee.firstName - the first name
   * @param {string} employee.middleName - the middle name
   * @param {string} employee.lastName - the last name
   * @param {string} employee.employeeId - the employee ID
   * @param {string} employee.otherId - the Other ID
   * @param {string} employee.driversLicenseNumber - the driver's license number
   * @param {string} employee.licenseExpiryDate - the license expiry date
   * @param {string} employee.nationality - the nationality
   * @param {string} employee.dateOfBirth - the date of birth
   * @param {string} employee.maritalStatus - the marital status
   * @param {string} employee.gender - the gender
   */
  static verifyEmployeeInformation(employee: IEmployeeVerificationData) {
    this.verifyIdentity(
      employee.firstName,
      employee.middleName,
      employee.lastName,
      employee.employeeId,
    );

    const fields = [
      [FIELD_LABELS.otherId, LOCATORS.input, employee.otherId],
      [
        FIELD_LABELS.driversLicense,
        LOCATORS.input,
        employee.driversLicenseNumber,
      ],
      [
        FIELD_LABELS.licenseExpiry,
        PAGE_LOCATORS.dateInput,
        employee.licenseExpiryDate,
      ],
      [
        FIELD_LABELS.nationality,
        LOCATORS.selectText,
        employee.nationality,
        "contain.text",
      ],
      [FIELD_LABELS.dateOfBirth, PAGE_LOCATORS.dateInput, employee.dateOfBirth],
      [
        FIELD_LABELS.maritalStatus,
        LOCATORS.selectText,
        employee.maritalStatus,
        "contain.text",
      ],
    ] as const;

    fields.forEach(([label, selector, value, assertion]) =>
      WebElementHandler.verifyField(label, selector, value, assertion),
    );

    this.getGenderOption(employee.gender)
      .find(PAGE_LOCATORS.radioInput)
      .should("be.checked");
  }

  /**
   * Saves the Personal Details form and verifies the API response.
   * @param {string} alias - the alias to assign to the intercepted request
   */
  static saveDetails(alias: string) {
    ApiHelper.intercept(HTTP_METHODS.PUT, API_URLS.personalDetails, alias);

    this.getSaveButton().click();
    ApiHelper.wait(alias);
  }

  /**
   * Opens the Add Attachment dialog.
   */
  static clickAddAttachmentButton() {
    WebElementHandler.click(PAGE_LOCATORS.attachmentAddButton);
  }

  /**
   * Uploads an Excel file as an employee attachment.
   * @param {string} filePath - the path of the Excel file to upload
   * @param {string} fileName - the name used for the uploaded Excel file
   * @param {string} alias - the alias to assign to the intercepted request
   */
  static uploadExcelFile(filePath: string, fileName: string, alias: string) {
    const dialog = () => cy.get(PAGE_LOCATORS.attachmentDialogContainer).last();

    dialog()
      .find(LOCATORS.fileInput)
      .selectFile({ contents: filePath, fileName }, { force: true });

    ApiHelper.intercept(HTTP_METHODS.POST, ATTACHMENTS_ENDPOINT, alias);

    dialog().find(LOCATORS.submitButton).click();

    ApiHelper.wait(alias);
  }

  /**
   * Verifies that the uploaded attachment appears in the attachment table.
   * @param {string} fileName - the expected uploaded file name
   */
  static verifyUploadedFileName(fileName: string) {
    WebElementHandler.verifyElement(
      PAGE_LOCATORS.attachmentTableBody,
      "be.visible",
      { timeout: 10000 },
    ).and("contain.text", fileName);
  }

  /**
   * Clicks the download icon for the attachment row matching the given
   * file name, triggering the browser download.
   * @param {string} fileName - the file name of the attachment to download
   */
  static downloadAttachment(fileName: string) {
    cy.get(PAGE_LOCATORS.attachmentTableBody)
      .contains(PAGE_LOCATORS.attachmentRow, fileName)
      .find(PAGE_LOCATORS.attachmentDownloadIcon)
      .click();
  }
}
