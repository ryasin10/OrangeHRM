/**
 * Page Object Model for the dashboard page.
 */
export default class DashboardPage {
  /** Verifies that the dashboard URL is displayed. */
  static verifyLoaded() {
    cy.url().should("include", "/dashboard");
  }
}
