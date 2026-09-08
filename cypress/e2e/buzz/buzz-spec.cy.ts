describe("Buzz Page Tests", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    cy.get(".oxd-input-group").eq(0).find("input").type("Admin");
    cy.get(".oxd-input-group").eq(1).find("input").type("admin123");
    cy.intercept("GET", "**/web/index.php/dashboard/index*").as("dashboard");
    cy.get(".orangehrm-login-button").click();
    cy.wait("@dashboard").its("response.statusCode").should("eq", 200);
  });

  it("TC10: Verify user can create a post using fixture data", () => {
    cy.fixture("buzzData").then((data) => {
      cy.intercept("POST", "**/web/index.php/api/v2/buzz/posts*").as(
        "createPost",
      );

      cy.get(".oxd-main-menu-item").contains("Buzz").click();

      cy.get(".oxd-buzz-post-input").should("be.visible").type(data.postText);

      cy.contains("button", "Post").should("be.visible").click({ force: true });

      cy.wait("@createPost").its("response.statusCode").should("eq", 200);

      cy.contains(".orangehrm-buzz-post-body-text", data.postText).should(
        "be.visible",
      );
    });
  });
});
