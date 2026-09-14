const LOCATORS = {
  myInfoMenuItem: ".oxd-main-menu-item",
};

export default class MyInfoPage {
  static getMyInfoMenuItem() {
    return cy.get(LOCATORS.myInfoMenuItem).contains("My Info");
  }

  static interceptMyInfoDetails() {
    cy.intercept("GET", "**/api/v2/pim/employees/*/personal-details").as(
      "myInfoDetails",
    );
    return this;
  }

  static waitForMyInfoDetails() {
    cy.wait("@myInfoDetails").its("response.statusCode").should("eq", 200);
    return this;
  }

  static navigateToMyInfo() {
    this.getMyInfoMenuItem().click();
    return this;
  }

  static visitMyInfo() {
    this.interceptMyInfoDetails();
    this.navigateToMyInfo();
    this.waitForMyInfoDetails();
    return this;
  }
}
