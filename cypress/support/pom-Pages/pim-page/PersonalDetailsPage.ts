const LOCATORS = {
  inputGroup: ".oxd-input-group",
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
  saveButton: ".oxd-button--secondary",
};

export default class PersonalDetailsPage {
  static getFullNameInputs() {
    return cy
      .contains("label", LOCATORS.fullNameLabel)
      .parents(LOCATORS.inputGroup)
      .find("input");
  }

  static getFirstNameValue() {
    return this.getFullNameInputs().eq(0);
  }

  static getMiddleNameValue() {
    return this.getFullNameInputs().eq(1);
  }

  static getLastNameValue() {
    return this.getFullNameInputs().eq(2);
  }

  static getEmployeeIdInput() {
    return cy
      .contains("label", LOCATORS.employeeIdLabel)
      .parents(LOCATORS.inputGroup)
      .find("input");
  }

  static getOtherIdInput() {
    return cy
      .contains("label", LOCATORS.otherIdLabel)
      .parents(LOCATORS.inputGroup)
      .find("input");
  }

  static getDriversLicenseInput() {
    return cy
      .contains("label", LOCATORS.driversLicenseLabel)
      .parents(LOCATORS.inputGroup)
      .find("input");
  }

  static getLicenseExpiryInput() {
    return cy
      .contains("label", LOCATORS.licenseExpiryLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.dateInput);
  }

  static getNationalityDropdown() {
    return cy
      .contains("label", LOCATORS.nationalityLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.selectText);
  }

  static getDateOfBirthInput() {
    return cy
      .contains("label", LOCATORS.dateOfBirthLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.dateInput);
  }

  static getMaritalStatusDropdown() {
    return cy
      .contains("label", LOCATORS.maritalStatusLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.selectText);
  }

  static getGenderOption(gender: string) {
    return cy
      .contains("label", LOCATORS.genderLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.radioWrapper)
      .contains(gender);
  }

  static getDropdownOption(optionText: string) {
    return cy.get(LOCATORS.selectDropdown).contains(optionText);
  }

  static getSaveButton() {
    return cy.get(LOCATORS.saveButton).eq(0).contains("Save");
  }

  static interceptSavePersonalDetails() {
    cy.intercept("PUT", "**/api/v2/pim/employees/*/personal-details").as(
      "savePersonalDetails",
    );
    return this;
  }

  static waitForSavePersonalDetails() {
    cy.wait("@savePersonalDetails")
      .its("response.statusCode")
      .should("eq", 200);
    return this;
  }

  static typeOtherId(otherId: string) {
    this.getOtherIdInput().clear().type(otherId);
    return this;
  }

  static typeDriversLicense(licenseNumber: string) {
    this.getDriversLicenseInput().type(licenseNumber);
    return this;
  }

  static typeLicenseExpiry(date: string) {
    this.getLicenseExpiryInput().type(date);
    return this;
  }

  static selectNationality(nationality: string) {
    this.getNationalityDropdown().click({ force: true });
    this.getDropdownOption(nationality).click({ force: true });
    return this;
  }

  static typeDateOfBirth(date: string) {
    this.getDateOfBirthInput().type(date);
    return this;
  }

  static selectMaritalStatus(status: string) {
    this.getMaritalStatusDropdown().click();
    this.getDropdownOption(status).click();
    return this;
  }

  static selectGender(gender: string) {
    this.getGenderOption(gender).click({ force: true });
    return this;
  }

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
    return this;
  }

  static saveDetails() {
    this.interceptSavePersonalDetails();
    this.getSaveButton().click();
    this.waitForSavePersonalDetails();
    return this;
  }
}
