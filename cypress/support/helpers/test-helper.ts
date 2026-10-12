/**
 * Helper for common test setup and cleanup actions.
 */
export default class TestHelper {
  /** Clears the current Cypress session cookies. */
  static clearCookies() {
    cy.clearCookies();
  }

  /** Formats a date as an ISO calendar date. */
  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}
