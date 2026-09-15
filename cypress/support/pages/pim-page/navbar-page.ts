const LOCATORS = {
  userDropdown: ".oxd-userdropdown-tab",
  logoutLink: "a",
};

export default class NavbarPage {
  static userDropdownVisible() {
    cy.get(LOCATORS.userDropdown).should("be.visible");
  }

  static getUserDropdown() {
    return cy.get(LOCATORS.userDropdown);
  }

  static getLogoutLink() {
    return cy.contains(LOCATORS.logoutLink, "Logout");
  }

  static clickUserDropdown() {
    this.getUserDropdown().click();
  }

  static clickLogout() {
    this.getLogoutLink().click();
  }

  static logout() {
    this.clickUserDropdown();
    this.clickLogout();
  }

  static verifyLoggedOut() {
    cy.url().should("include", "/auth/login");
  }
}
