/**
 * ApiHelper
 * Groups reusable API actions used across the test suite.
 */
export default class ApiHelper {
  /**
   * Intercepts an API request and assigns the given alias.
   * @param {string} method - the HTTP request method
   * @param {string} url - the API endpoint to intercept
   * @param {string} alias - the alias assigned to the intercepted request
   */
  static intercept(method: string, url: string, alias: string) {
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
   * @returns {Cypress.Chainable<number>} the delete request status
   */
  static delete(url: string, ids: number[]): Cypress.Chainable<number> {
    return cy
      .request({
        method: "DELETE",
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
      cy.login("Admin", "admin123");
      cy.url().should("include", "/dashboard");
    });
  }
}
