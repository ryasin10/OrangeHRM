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
  }

  static getMiddleNameValue(middleName: string) {
    this.getFullNameInputs().eq(1).should("have.value", middleName);
  }

  static getLastNameValue(lastName: string) {
    this.getFullNameInputs().eq(2).should("have.value", lastName);
  }

  static getEmployeeIdInput(employeeId: string) {
    cy.contains("label", LOCATORS.employeeIdLabel)
      .parents(LOCATORS.inputGroup)
      .find("input")
      .should("have.value", employeeId);
  }

  static getOtherIdInput(otherId: string) {
    cy.contains("label", LOCATORS.otherIdLabel)
      .parents(LOCATORS.inputGroup)
      .find("input")
      .should("have.value", otherId);
  }

  static getDriversLicenseInput(licenseNumber: string) {
    cy.contains("label", LOCATORS.driversLicenseLabel)
      .parents(LOCATORS.inputGroup)
      .find("input")
      .should("have.value", licenseNumber);
  }

  static getLicenseExpiryInput(licenseExpiryDate: string) {
    cy.contains("label", LOCATORS.licenseExpiryLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.dateInput)
      .should("have.value", licenseExpiryDate);
  }

  static getNationalityDropdown(nationality: string) {
    cy.contains("label", LOCATORS.nationalityLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.selectText)
      .should("contain.text", nationality);
  }

  static getDateOfBirthInput(dateOfBirth: string) {
    cy.contains("label", LOCATORS.dateOfBirthLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.dateInput)
      .should("have.value", dateOfBirth);
  }

  static getMaritalStatusDropdown(maritalStatus: string) {
    cy.contains("label", LOCATORS.maritalStatusLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.selectText)
      .should("contain.text", maritalStatus);
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
  }

  static waitForSavePersonalDetails() {
    cy.wait("@savePersonalDetails")
      .its("response.statusCode")
      .should("eq", 200);
  }

  static typeOtherId(otherId: string) {
    cy.contains("label", LOCATORS.otherIdLabel)
      .parents(LOCATORS.inputGroup)
      .find("input")
      .clear()
      .type(otherId);
  }

  static typeDriversLicense(driversLicenseNumber: string) {
    cy.contains("label", LOCATORS.driversLicenseLabel)
      .parents(LOCATORS.inputGroup)
      .find("input")
      .type(driversLicenseNumber);
  }

  static typeLicenseExpiry(date: string) {
    cy.contains("label", LOCATORS.licenseExpiryLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.dateInput)
      .type(date);
  }

  static selectNationality(nationality: string) {
    cy.contains("label", LOCATORS.nationalityLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.selectText)
      .click({ force: true });

    this.getDropdownOption(nationality).click({ force: true });
  }

  static typeDateOfBirth(date: string) {
    cy.contains("label", LOCATORS.dateOfBirthLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.dateInput)
      .type(date);
  }

  static selectMaritalStatus(status: string) {
    cy.contains("label", LOCATORS.maritalStatusLabel)
      .parents(LOCATORS.inputGroup)
      .find(LOCATORS.selectText)
      .click();

    this.getDropdownOption(status).click();
  }

  static selectGender(gender: string) {
    this.getGenderOption(gender).click({ force: true });
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
  }

  static saveDetails() {
    this.interceptSavePersonalDetails();
    this.getSaveButton().click();
    this.waitForSavePersonalDetails();
  }
}
