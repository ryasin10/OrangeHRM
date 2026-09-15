import LoginPage from "@cypress/support/pages/login-page";
import DashboardPage from "@cypress/support/pages/dashboard-page";

describe("OrangeHRM Login Page Tests", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("TC12 - Check valid login", () => {
    LoginPage.login("Admin", "admin123");
    DashboardPage.verifyLoaded();
  });

  it("TC13 - Check invalid username and valid password", () => {
    LoginPage.login("wrongUser", "admin123");
    LoginPage.verifyErrorMessage("Invalid credentials");
  });

  it("TC14 - Check valid username and invalid password", () => {
    LoginPage.login("Admin", "wrongPass");
    LoginPage.verifyErrorMessage("Invalid credentials");
  });

  it("TC15 - Check invalid username and invalid password", () => {
    LoginPage.login("wrongUser", "wrongPass");
    LoginPage.verifyErrorMessageIsShown();
  });

  it("TC16 - Check empty username and valid password", () => {
    LoginPage.enterPassword("admin123");
    LoginPage.clickLogin();
    LoginPage.getUsernameError();
  });

  it("TC17 - Check valid username and empty password", () => {
    LoginPage.enterUsername("Admin");
    LoginPage.clickLogin();
    LoginPage.getPasswordError();
  });

  it("TC18 - Check empty username and empty password", () => {
    LoginPage.clickLogin();
    LoginPage.getUsernameError();
    LoginPage.getPasswordError();
  });

  it("TC19 - Check password case sensitivity", () => {
    LoginPage.login("Admin", "Admin123");
    LoginPage.verifyErrorMessage("Invalid credentials");
  });

  it("TC20 - Check username with leading spaces", () => {
    LoginPage.login("   Admin", "admin123");
    LoginPage.verifyErrorMessage("Invalid credentials");
  });
});
