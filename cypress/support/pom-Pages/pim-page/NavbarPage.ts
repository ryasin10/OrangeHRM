const LOCATORS = {
  userDropdown: ".oxd-userdropdown-tab",
  logoutLink: "a",
};

export default class NavbarPage {
  static getUserDropdown() {
    return cy.get(LOCATORS.userDropdown);
  }

  static getLogoutLink() {
    return cy.contains(LOCATORS.logoutLink, "Logout");
  }

  static clickUserDropdown() {
    this.getUserDropdown().click();
    return this;
  }

  static clickLogout() {
    this.getLogoutLink().click();
    return this;
  }

  static logout() {
    this.clickUserDropdown();
    this.clickLogout();
    return this;
  }
}
