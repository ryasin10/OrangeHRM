import LoginPage from "@cypress/support/pom-Pages/LoginPage";
import DashboardPage from "@cypress/support/pom-Pages/DashboardPage";

describe("OrangeHRM Login Page Tests", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("TC12 - Check valid login", () => {
    LoginPage.login("Admin", "admin123");
    DashboardPage.verifyLoaded();
  });

  it("TC13 - Check invalid username and valid password", () => {
    LoginPage.login("wronguser", "admin123");
    LoginPage.getAlertMessage().should("have.text", "Invalid credentials");
  });

  it("TC14 - Check valid username and invalid password", () => {
    LoginPage.login("Admin", "wrongpass");
    LoginPage.getAlertMessage().should("contain.text", "Invalid credentials");
  });

  it("TC15 - Check invalid username and invalid password", () => {
    LoginPage.login("wronguser", "wrongpass");
    LoginPage.getAlertMessage().should("exist");
  });

  it("TC16 - Check empty username and valid password", () => {
    LoginPage.enterPassword("admin123");
    LoginPage.clickLogin();
    LoginPage.getUsernameError().should("have.text", "Required");
  });

  it("TC17 - Check valid username and empty password", () => {
    LoginPage.enterUsername("Admin");
    LoginPage.clickLogin();
    LoginPage.getPasswordError().should("have.text", "Required");
  });

  it("TC18 - Check empty username and empty password", () => {
    LoginPage.clickLogin();
    LoginPage.getUsernameError().should("have.text", "Required");
    LoginPage.getPasswordError().should("have.text", "Required");
  });

  it("TC19 - Check password case sensitivity", () => {
    LoginPage.login("Admin", "Admin123");
    LoginPage.getAlertMessage().should("have.text", "Invalid credentials");
  });

  it("TC20 - Check username with leading spaces", () => {
    LoginPage.login("   Admin", "admin123");
    LoginPage.getAlertMessage().should("have.text", "Invalid credentials");
  });
});
