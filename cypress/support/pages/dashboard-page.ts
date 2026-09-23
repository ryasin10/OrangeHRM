export default class DashboardPage {
  static verifyLoaded() {
    cy.url().should("include", "/dashboard");
  }
}
