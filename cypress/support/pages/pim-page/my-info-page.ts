import WebElementHandler from "@cypress/support/helpers/web-element-handler";
import ApiHelper from "@cypress/support/helpers/api-helpers";

const LOCATORS = {
  myInfoMenuItem: ".oxd-main-menu-item",
};

/**
 * Page Object Model for the employee My Info page.
 */
export default class MyInfoPage {
  /** Returns the My Info navigation item. */
  static getMyInfoMenuItem() {
    return WebElementHandler.getElement(LOCATORS.myInfoMenuItem).contains(
      "My Info",
    );
  }

  /** Opens the My Info page. */
  static navigateToMyInfo() {
    this.getMyInfoMenuItem().click();
  }

  /** Opens My Info and waits for the Personal Details request. */
  static visitMyInfo() {
    ApiHelper.intercept(
      "GET",
      "**/api/v2/pim/employees/*/personal-details",
      "myInfoDetails",
    );
    this.navigateToMyInfo();
    ApiHelper.wait("myInfoDetails");
  }
}
