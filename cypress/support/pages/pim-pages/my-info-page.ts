import WebElementHandler from "@cypress/support/helpers/web-element-handler";
import ApiHelper, { HTTP_METHODS } from "@cypress/support/helpers/api-helpers";
import { LOCATORS, API_URLS } from "@cypress/support/helpers/constants";

/**
 * Page Object Model for the employee My Info page.
 */
export default class MyInfoPage {
  /** Finds the My Info navigation item and clicks it. */
  static navigateToMyInfo() {
    WebElementHandler.getElement(LOCATORS.menuItem).contains("My Info").click();
  }

  /**
   * Opens My Info and waits for the Personal Details request.
   * @param {string} alias - the alias to assign to the intercepted request
   */
  static visitMyInfo(alias: string) {
    ApiHelper.intercept(HTTP_METHODS.GET, API_URLS.personalDetails, alias);
    this.navigateToMyInfo();
    ApiHelper.wait(alias);
  }
}