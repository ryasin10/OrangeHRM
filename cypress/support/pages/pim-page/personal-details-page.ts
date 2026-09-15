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

  static getFirstNameValue(firstName: string) {
    this.getFullNameInputs().eq(0).should("have.value", firstName);
    return this;
  }

  static getMiddleNameValue(middleName: string) {
    this.getFullNameInputs().eq(1).should("have.value", middleName);
    return this;
  }

  static getLastNameValue(lastName: string) {
    this.getFullNameInputs().eq(2).should("have.value", lastName);
    return this;
  }

  static getEmployeeIdInput(employeeId: string) {
    cy.contains("label", LOCATORS.employeeIdLabel)
      .parents(LOCATORS.inputGroup)
      .find("input")
      .should("have.value", employeeId);
    return this;
  }

  static getOtherIdInput(otherId: string) {
    cy.contains("label", LOCATORS.otherIdLabel)
      .parents(LOCATORS.inputGroup)
      .find("input")
      .should("have.value", otherId);
    return this;
  }

  static getDriversLicenseInput(licenseNumber: string) {
    cy.contains("label", LOCATORS.driversLicenseLabel)
      .parents(LOCATORS.inputGroup)
      .find("input")
      .should("have.value", licenseNumber);
    return this;
  }

  static getLicenseExpiryInput(licenseExpiryDate: string) {
    cy.contains("label", LOCATORS.licenseExpiryLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.dateInput)
      .should("have.value", licenseExpiryDate);
    return this;
  }

  static getNationalityDropdown(nationality: string) {
    cy.contains("label", LOCATORS.nationalityLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.selectText)
      .should("contain.text", nationality);
    return this;
  }

  static getDateOfBirthInput(dateOfBirth: string) {
    cy.contains("label", LOCATORS.dateOfBirthLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.dateInput)
      .should("have.value", dateOfBirth);
    return this;
  }

  static getMaritalStatusDropdown(maritalStatus: string) {
    cy.contains("label", LOCATORS.maritalStatusLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.selectText)
      .should("contain.text", maritalStatus);
    return this;
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
    cy.contains("label", LOCATORS.otherIdLabel)
      .parents(LOCATORS.inputGroup)
      .find("input")
      .clear()
      .type(otherId);
    return this;
  }

  static typeDriversLicense(driversLicenseNumber: string) {
    cy.contains("label", LOCATORS.driversLicenseLabel)
      .parents(LOCATORS.inputGroup)
      .find("input")
      .type(driversLicenseNumber);
    return this;
  }

  static typeLicenseExpiry(date: string) {
    cy.contains("label", LOCATORS.licenseExpiryLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.dateInput)
      .type(date);
    return this;
  }

  static selectNationality(nationality: string) {
    cy.contains("label", LOCATORS.nationalityLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.selectText)
      .click({ force: true });
    this.getDropdownOption(nationality).click({ force: true });
    return this;
  }

  static typeDateOfBirth(date: string) {
    cy.contains("label", LOCATORS.dateOfBirthLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.dateInput)
      .type(date);
    return this;
  }

  static selectMaritalStatus(status: string) {
    cy.contains("label", LOCATORS.maritalStatusLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.selectText)
      .click();
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
