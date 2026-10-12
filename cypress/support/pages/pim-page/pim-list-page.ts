const LOCATORS = {
  pimMenuItem: ".oxd-main-menu-item",
  addButton: ".oxd-button",
  addEmployeeHeader: "Add Employee",
};

export default class PimListPage {
  static getPimMenuItem() {
    return cy.get(LOCATORS.pimMenuItem).contains("PIM");
  }

  static getAddButton() {
    return cy.get(LOCATORS.addButton).contains("Add");
  }

  static AddEmployeeHeader() {
    cy.contains(LOCATORS.addEmployeeHeader).should("be.visible");
  }

  static interceptPimList() {
    cy.intercept("GET", "**/api/v2/pim/employees*").as("pim");
  }

  static waitForPimList() {
    cy.wait("@pim").its("response.statusCode").should("eq", 200);
  }

  static navigateToPim() {
    this.getPimMenuItem().click();
  }

  static clickAddButton() {
    this.getAddButton().click();
  }

  static goToAddEmployee() {
    this.interceptPimList();
    this.navigateToPim();
    this.waitForPimList();
    this.clickAddButton();
  }
}
