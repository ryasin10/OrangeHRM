/**
 * Page Object Model for the dashboard page.
 */
export default class DashboardPage {
  /** Opens the dashboard page and verifies that navigation succeeded. */
  static open() {
    cy.visit("/web/index.php/dashboard/index");
    this.verifyLoaded();
  }

  /** Verifies that the dashboard URL is displayed. */
  static verifyLoaded() {
    cy.url().should("include", "/dashboard");
  }
}
