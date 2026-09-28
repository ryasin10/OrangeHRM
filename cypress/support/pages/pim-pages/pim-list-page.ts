import DashboardPage from "../dashboard-page";
import ApiHelper from "@cypress/support/helpers/api-helpers";
import { LOCATORS } from "@cypress/support/helpers/constants";

const ADD_EMPLOYEE_HEADER = "Add Employee";
const ADD_BUTTON = "button.oxd-button--secondary";

/**
 * Page Object Model for the PIM employee list page.
 */
export default class PimListPage {
  /** Returns the PIM navigation menu item. */
  static getPimMenuItem() {
    return cy.get(LOCATORS.menuItem).contains("PIM");
  }

  /** Returns the Add Employee button. */
  static getAddButton() {
    return cy.get(ADD_BUTTON).contains("Add");
  }

  /** Verifies that the Add Employee page header is visible. */
  static verifyAddEmployeeHeader() {
    return cy
      .contains(ADD_EMPLOYEE_HEADER, { timeout: 10000 })
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

  /**
   * Opens the Add Employee form after the PIM employee request completes.
   * @param {string} alias - the alias to assign to the intercepted request
   */
  static goToAddEmployee(alias: string) {
    ApiHelper.interceptEmployeeList(alias);
    this.navigateToPim();
    ApiHelper.waitForEmployeeList(alias);
    this.clickAddButton();
  }
}
