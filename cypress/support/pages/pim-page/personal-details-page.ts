import ApiHelper from "@cypress/support/helpers/api-helpers";
import WebElementHandler from "@cypress/support/helpers/web-element-handler";
import CommonHelper from "@cypress/support/helpers/common-helper";

const LOCATORS = {
  fullNameLabel: "Employee Full Name",
  employeeIdLabel: "Employee Id",
  otherIdLabel: "Other Id",
  driversLicenseLabel: "Driver's License Number",
  licenseExpiryLabel: "License Expiry Date",
  nationalityLabel: "Nationality",
  dateOfBirthLabel: "Date of Birth",
  maritalStatusLabel: "Marital Status",
  genderLabel: "Gender",
  dateInput: ".oxd-date-input input",
  selectText: ".oxd-select-text",
  selectDropdown: ".oxd-select-dropdown",
  radioWrapper: ".oxd-radio-wrapper",
  saveButton: ".oxd-form-actions button[type='submit']",
  attachmentAddButton: ".orangehrm-action-header button",
  attachmentDialogContainer: ".orangehrm-card-container",
  attachmentTableBody: ".oxd-table-body",
  attachmentInput: 'input[type="file"].oxd-file-input',
  attachmentSaveButton: 'button[type="submit"]',
  attachmentRow: ".oxd-table-card",
  attachmentDownloadIcon: ".oxd-table-cell-actions .bi-download",
};

/**
 * PersonalDetailsPage
 * Contains actions and assertions for the Personal Details page.
 * CommonHelper locates label-scoped field groups; WebElementHandler is
 * used for the plain-locator actions/assertions on this page.
 */
export default class PersonalDetailsPage {
  /**
   * Returns the input fields inside the Employee Full Name group.
   */
  static getFullNameInputs() {
    return CommonHelper.getInputGroup(LOCATORS.fullNameLabel).find("input");
  }

  /**
   * Verifies that the first name field contains the expected value.
   * @param {string} firstName - the expected first name
   */
  static verifyFirstNameValue(firstName: string) {
    this.getFullNameInputs().eq(0).should("have.value", firstName);
  }

  /**
   * Verifies that the middle name field contains the expected value.
   * @param {string} middleName - the expected middle name
   */
  static verifyMiddleNameValue(middleName: string) {
    this.getFullNameInputs().eq(1).should("have.value", middleName);
  }

  /**
   * Verifies that the last name field contains the expected value.
   * @param {string} lastName - the expected last name
   */
  static verifyLastNameValue(lastName: string) {
    this.getFullNameInputs().eq(2).should("have.value", lastName);
  }

  /**
   * Verifies that the Employee ID field contains the expected value.
   * @param {string} employeeId - the expected employee ID
   */
  static verifyEmployeeIdValue(employeeId: string) {
    CommonHelper.getInputGroup(LOCATORS.employeeIdLabel)
      .find("input", { timeout: 10000 })
      .should("have.value", employeeId);
  }

  /**
   * Verifies that the Other ID field contains the expected value.
   * @param {string} otherId - the expected Other ID
   */
  static verifyOtherIdValue(otherId: string) {
    CommonHelper.getInputGroup(LOCATORS.otherIdLabel)
      .find("input")
      .should("have.value", otherId);
  }

  /**
   * Verifies that the driver's license field contains the expected value.
   * @param {string} licenseNumber - the expected driver's license number
   */
  static verifyDriversLicenseValue(licenseNumber: string) {
    CommonHelper.getInputGroup(LOCATORS.driversLicenseLabel)
      .find("input")
      .should("have.value", licenseNumber);
  }

  /**
   * Verifies that the license expiry field contains the expected value.
   * @param {string} licenseExpiryDate - the expected license expiry date
   */
  static verifyLicenseExpiryValue(licenseExpiryDate: string) {
    CommonHelper.getInputGroup(LOCATORS.licenseExpiryLabel)
      .find(LOCATORS.dateInput)
      .should("have.value", licenseExpiryDate);
  }

  /**
   * Verifies that the nationality dropdown contains the expected value.
   * @param {string} nationality - the expected nationality
   */
  static verifyNationalityValue(nationality: string) {
    CommonHelper.getInputGroup(LOCATORS.nationalityLabel)
      .find(LOCATORS.selectText)
      .should("contain.text", nationality);
  }

  /**
   * Verifies that the date of birth field contains the expected value.
   * @param {string} dateOfBirth - the expected date of birth
   */
  static verifyDateOfBirthValue(dateOfBirth: string) {
    CommonHelper.getInputGroup(LOCATORS.dateOfBirthLabel)
      .find(LOCATORS.dateInput)
      .should("have.value", dateOfBirth);
  }

  /**
   * Verifies that the marital status dropdown contains the expected value.
   * @param {string} maritalStatus - the expected marital status
   */
  static verifyMaritalStatusValue(maritalStatus: string) {
    CommonHelper.getInputGroup(LOCATORS.maritalStatusLabel)
      .find(LOCATORS.selectText)
      .should("contain.text", maritalStatus);
  }

  /**
   * Returns the gender option matching the given gender.
   * @param {string} gender - the gender option to find
   */
  static getGenderOption(gender: string) {
    return CommonHelper.getInputGroup(LOCATORS.genderLabel)
      .find(LOCATORS.radioWrapper)
      .contains(gender);
  }

  /**
   * Returns a dropdown option matching the given text.
   * @param {string} optionText - the text of the dropdown option
   */
  static getDropdownOption(optionText: string) {
    return cy.get(LOCATORS.selectDropdown).contains(optionText);
  }

  /**
   * Returns the Save button in the Personal Details form.
   */
  static getSaveButton() {
    return cy.get(LOCATORS.saveButton).contains("Save");
  }

  /**
   * Types the given value into the Other ID field.
   * @param {string} otherId - the Other ID to enter
   */
  static typeOtherId(otherId: string) {
    CommonHelper.typeInField(LOCATORS.otherIdLabel, otherId);
  }

  /**
   * Types the given value into the driver's license field.
   * @param {string} driversLicenseNumber - the driver's license number to enter
   */
  static typeDriversLicense(driversLicenseNumber: string) {
    CommonHelper.getInputGroup(LOCATORS.driversLicenseLabel)
      .find("input")
      .type(driversLicenseNumber);
  }

  /**
   * Types the given date into the license expiry field.
   * @param {string} date - the license expiry date to enter
   */
  static typeLicenseExpiry(date: string) {
    CommonHelper.getInputGroup(LOCATORS.licenseExpiryLabel)
      .find(LOCATORS.dateInput)
      .clear()
      .type(date);
  }

  /**
   * Selects the given nationality from the nationality dropdown.
   * @param {string} nationality - the nationality to select
   */
  static selectNationality(nationality: string) {
    CommonHelper.getInputGroup(LOCATORS.nationalityLabel)
      .find(LOCATORS.selectText)
      .click({ force: true });

    this.getDropdownOption(nationality).click({ force: true });
  }

  /**
   * Types the given date into the date of birth field.
   * @param {string} date - the date of birth to enter
   */
  static typeDateOfBirth(date: string) {
    CommonHelper.getInputGroup(LOCATORS.dateOfBirthLabel)
      .find(LOCATORS.dateInput)
      .type(date);
  }

  /**
   * Selects the given marital status from the dropdown.
   * @param {string} status - the marital status to select
   */
  static selectMaritalStatus(status: string) {
    CommonHelper.selectOption(LOCATORS.maritalStatusLabel, status);
  }

  /**
   * Selects the given gender option.
   * @param {string} gender - the gender option to select
   */
  static selectGender(gender: string) {
    this.getGenderOption(gender).click({ force: true });
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
  static fillDetails(data: {
    otherId: string;
    driversLicenseNumber: string;
    licenseExpiryDate: string;
    nationality: string;
    dateOfBirth: string;
    maritalStatus: string;
    gender: string;
  }) {
    this.typeOtherId(data.otherId);
    this.typeDriversLicense(data.driversLicenseNumber);
    this.typeLicenseExpiry(data.licenseExpiryDate);
    this.selectNationality(data.nationality);
    this.typeDateOfBirth(data.dateOfBirth);
    this.selectMaritalStatus(data.maritalStatus);
    this.selectGender(data.gender);
  }

  /**
   * Verifies the employee Personal Details.
   * @param {object} data - the employee Personal Details
   * @param {string} data.firstName - the first name
   * @param {string} data.middleName - the middle name
   * @param {string} data.lastName - the last name
   * @param {string} data.employeeId - the employee ID
   * @param {string} data.otherId - the Other ID
   * @param {string} data.driversLicenseNumber - the driver's license number
   * @param {string} data.licenseExpiryDate - the license expiry date
   * @param {string} data.nationality - the nationality
   * @param {string} data.dateOfBirth - the date of birth
   * @param {string} data.maritalStatus - the marital status
   * @param {string} data.gender - the gender
   */
  static verifyDetails(data: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
    otherId: string;
    driversLicenseNumber: string;
    licenseExpiryDate: string;
    nationality: string;
    dateOfBirth: string;
    maritalStatus: string;
    gender: string;
  }) {
    WebElementHandler.verifyValue(
      this.getFullNameInputs().eq(0),
      data.firstName,
    );

    WebElementHandler.verifyValue(
      this.getFullNameInputs().eq(1),
      data.middleName,
    );

    WebElementHandler.verifyValue(
      this.getFullNameInputs().eq(2),
      data.lastName,
    );

    WebElementHandler.verifyValue(
      CommonHelper.getInputGroup(LOCATORS.employeeIdLabel).find("input"),
      data.employeeId,
    );

    WebElementHandler.verifyValue(
      CommonHelper.getInputGroup(LOCATORS.otherIdLabel).find("input"),
      data.otherId,
    );

    WebElementHandler.verifyValue(
      CommonHelper.getInputGroup(LOCATORS.driversLicenseLabel).find("input"),
      data.driversLicenseNumber,
    );

    WebElementHandler.verifyValue(
      CommonHelper.getInputGroup(LOCATORS.licenseExpiryLabel).find(
        LOCATORS.dateInput,
      ),
      data.licenseExpiryDate,
    );

    WebElementHandler.verifyText(
      CommonHelper.getInputGroup(LOCATORS.nationalityLabel).find(
        LOCATORS.selectText,
      ),
      data.nationality,
    );

    WebElementHandler.verifyValue(
      CommonHelper.getInputGroup(LOCATORS.dateOfBirthLabel).find(
        LOCATORS.dateInput,
      ),
      data.dateOfBirth,
    );

    WebElementHandler.verifyText(
      CommonHelper.getInputGroup(LOCATORS.maritalStatusLabel).find(
        LOCATORS.selectText,
      ),
      data.maritalStatus,
    );

    WebElementHandler.verifyChecked(
      CommonHelper.getInputGroup(LOCATORS.genderLabel)
        .find(LOCATORS.radioWrapper)
        .contains(data.gender)
        .find("input"),
    );
  }

  /**
   * Saves the Personal Details form and verifies the API response.
   */
  static saveDetails() {
    ApiHelper.intercept(
      "PUT",
      "**/api/v2/pim/employees/*/personal-details",
      "savePersonalDetails",
    );

    this.getSaveButton().click();
    ApiHelper.wait("savePersonalDetails");
  }

  /**
   * Opens the Add Attachment dialog.
   */
  static clickAddAttachmentButton() {
    WebElementHandler.click(LOCATORS.attachmentAddButton);
  }

  /**
   * Uploads an Excel file as an employee attachment.
   * @param {string} filePath - the path of the Excel file to upload
   * @param {string} fileName - the name used for the uploaded Excel file
   */
  static uploadExcelFile(filePath: string, fileName: string) {
    cy.get(LOCATORS.attachmentDialogContainer)
      .last()
      .find(LOCATORS.attachmentInput)
      .selectFile({ contents: filePath, fileName }, { force: true });

    ApiHelper.intercept(
      "POST",
      "**/api/v2/pim/employees/*/screen/personal/attachments",
      "uploadAttachment",
    );

    cy.get(LOCATORS.attachmentDialogContainer)
      .last()
      .find(LOCATORS.attachmentSaveButton)
      .click();

    ApiHelper.wait("uploadAttachment");
  }

  /**
   * Verifies that the uploaded attachment appears in the attachment table.
   * @param {string} fileName - the expected uploaded file name
   */
  static verifyUploadedFileName(fileName: string) {
    cy.get(LOCATORS.attachmentTableBody, { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", fileName);
  }

  /**
   * Clicks the download icon for the attachment row matching the given
   * file name, triggering the browser download.
   * @param {string} fileName - the file name of the attachment to download
   */
  static downloadAttachment(fileName: string) {
    cy.get(LOCATORS.attachmentTableBody)
      .contains(LOCATORS.attachmentRow, fileName)
      .find(LOCATORS.attachmentDownloadIcon)
      .click();
  }
}
