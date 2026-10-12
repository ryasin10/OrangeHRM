import { LEAVE_TEST_DATA } from "@cypress/support/helpers/constants";

/**
 * Page Object Model for employee leave navigation and verification.
 */
export default class LeavePage {
  /** Opens the Leave menu. */
  static openLeaveMenu() {
    cy.contains("span.oxd-main-menu-item--name", "Leave").click();
  }

  /** Opens the My Leave page. */
  static openMyLeave() {
    cy.contains("a", "My Leave").click();
  }

  /** Verifies that the My Leave page is displayed. */
  static verifyMyLeavePage() {
    cy.url().should("include", "/leave/viewMyLeaveList");
    cy.contains("My Leave").should("be.visible");
    cy.get(".oxd-table").should("be.visible");
  }

  /**
   * Verifies that the requested leave record has the expected details.
   * @param date - The requested leave date.
   */
  static verifyScheduledLeave(date: string) {
    const [year, month, day] = date.split("-");
    const displayedDate = `${year}-${day}-${month}`;

    cy.contains(".oxd-table-card", displayedDate)
      .should("contain.text", LEAVE_TEST_DATA.leaveType)
      .and("contain.text", "Scheduled");
  }
}
