import LoginPage from "@cypress/support/pages/login-page";
import { API_URLS } from "@cypress/support/helpers/constants";

/**
 * HTTP methods used when intercepting or sending API requests, so call
 * sites don't hardcode method strings.
 */
export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

/**
 * ApiHelper
 * Groups reusable API actions used across the test suite.
 */
export default class ApiHelper {
  /**
   * Intercepts an API request and assigns the given alias.
   * @param {HTTP_METHODS} method - the HTTP request method
   * @param {string} url - the API endpoint to intercept
   * @param {string} alias - the alias assigned to the intercepted request
   */
  static intercept(method: HTTP_METHODS, url: string, alias: string) {
    cy.intercept(method, url).as(alias);
  }

  /**
   * Waits for an intercepted API request and verifies its response status.
   * @param {string} alias - the alias of the intercepted request
   * @returns the intercepted request chain
   */
  static wait(alias: string) {
    return cy.wait(`@${alias}`).then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      return interception;
    });
  }

  /**
   * Sends a DELETE request using the given URL and query parameters.
   * @param {string} url - the API endpoint for the DELETE request
   * @param {number[]} ids - the employee IDs to delete
   */
  static delete(url: string, ids: number[]) {
    return cy
      .request({
        method: HTTP_METHODS.DELETE,
        url,
        body: { ids },
      })
      .its("status")
      .should("eq", 200);
  }

  /**
   * Creates an Admin session for cleanup operations.
   */
  static createAdminSession() {
    cy.session("admin-cleanup", () => {
      LoginPage.loginWithCommand();
      cy.url().should("include", "/dashboard");
    });
  }

  /**
   * Intercepts the employee list request (used when opening PIM / Add Employee).
   * @param {string} alias - the alias to assign to the intercepted request
   */
  static interceptEmployeeList(alias: string) {
    this.intercept(HTTP_METHODS.GET, API_URLS.employees, alias);
  }

  /**
   * Waits for the intercepted employee list request to complete.
   * @param {string} alias - the alias of the intercepted request
   */
  static waitForEmployeeList(alias: string) {
    return this.wait(alias);
  }

  /**
   * Intercepts the create-employee request.
   * @param {string} alias - the alias to assign to the intercepted request
   */
  static interceptCreateEmployee(alias: string) {
    this.intercept(HTTP_METHODS.POST, API_URLS.createEmployee, alias);
  }
}
