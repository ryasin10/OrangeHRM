const LOCATORS = {
  buzzMenuLink: 'a[href="/web/index.php/buzz/viewBuzz"]',
  postInput: ".oxd-buzz-post-input",
  postButton: "button",
  postBodyText: ".orangehrm-buzz-post-body-text",
};

export default class BuzzPage {
  static navigateToBuzz() {
    cy.get(LOCATORS.buzzMenuLink).click();
  }

  static getPostInput() {
    return cy.get(LOCATORS.postInput);
  }

  static getPostButton() {
    return cy.contains(LOCATORS.postButton, "Post");
  }

  static getPostBodyText(text: string) {
    return cy.contains(LOCATORS.postBodyText, text).should("be.visible");
  }

  static interceptCreatePost() {
    cy.intercept("POST", "**/web/index.php/api/v2/buzz/posts*").as(
      "createPost",
    );
  }

  static waitForPostCreation() {
    cy.wait("@createPost").its("response.statusCode").should("eq", 200);
  }

  static typePostContent(content: string) {
    this.getPostInput().type(content);
  }

  static submitPost() {
    this.getPostButton().click();
  }

  static createPost(content: string) {
    this.interceptCreatePost();
    this.typePostContent(content);
    this.submitPost();
    this.waitForPostCreation();
  }
}
