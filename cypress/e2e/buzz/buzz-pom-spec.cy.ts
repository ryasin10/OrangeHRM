import LoginPage from "@cypress/support/pom-Pages/LoginPage";
import BuzzPage from "@cypress/support/pom-Pages/BuzzPage";

describe("Buzz Page Tests", () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login("Admin", "admin123");
  });

  it("TC21: Verify user can create a post using fixture data", () => {
    cy.fixture("buzzData").then((data) => {
      BuzzPage.navigateToBuzz();
      BuzzPage.createPost(data.postText);
      BuzzPage.getPostBodyText(data.postText).should("be.visible");
    });
  });
});
