import DashboardPage from "../dashboard-page";
import ApiHelper from "@cypress/support/helpers/api-helpers";

const LOCATORS = {
  pimMenuItem: ".oxd-main-menu-item",
  addButton: ".oxd-button",
  addEmployeeHeader: "Add Employee",
};

/**
 * Page Object Model for the PIM employee list page.
 */
export default class PimListPage {
  /** Returns the PIM navigation menu item. */
  static getPimMenuItem() {
    return cy.get(LOCATORS.pimMenuItem).contains("PIM");
  }

  /** Returns the Add Employee button. */
  static getAddButton() {
    return cy.get(LOCATORS.addButton).contains("Add");
  }

  /** Verifies that the Add Employee page header is visible. */
  static verifyAddEmployeeHeader() {
    return cy
      .contains(LOCATORS.addEmployeeHeader, { timeout: 10000 })
      .should("be.visible");
  }

  /** Opens the PIM employee list page. */
  static navigateToPim() {
    DashboardPage.verifyLoaded();
    this.getPimMenuItem().click();
  }

  /** Opens the Add Employee form. */
  static clickAddButton() {
    this.getAddButton().click();
  }

  /** Opens the Add Employee form after the PIM employee request completes. */
  static goToAddEmployee() {
    ApiHelper.intercept("GET", "**/api/v2/pim/employees*", "pim");
    this.navigateToPim();
    ApiHelper.wait("pim");
    this.clickAddButton();
  }
}
