import { faker } from "@faker-js/faker";
import LoginPage from "@cypress/support/pom-Pages/LoginPage";
import PimListPage from "@cypress/support/pom-Pages/pim-page/PimListPage";
import AddEmployeePage from "@cypress/support/pom-Pages/pim-page/AddEmployee";
import PersonalDetailsPage from "@cypress/support/pom-Pages/pim-page/PersonalDetailsPage";
import NavbarPage from "@cypress/support/pom-Pages/pim-page/NavbarPage";
import MyInfoPage from "@cypress/support/pom-Pages/pim-page/MyInfoPage";

describe("PIM Page Test", () => {
  it("TC22 - Create employee and verify information", () => {
    const employeeId = faker.string.numeric(6);
    const username = `reem${faker.string.numeric(5)}`;

    LoginPage.visit();
    LoginPage.login("Admin", "admin123");

    PimListPage.goToAddEmployee();
    PimListPage.getAddEmployeeHeader().should("be.visible");

    cy.fixture("employee").then((employee) => {
      AddEmployeePage.createEmployee({
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        employeeId: employeeId,
        username: username,
        password: employee.password,
      });

      PersonalDetailsPage.getFirstNameValue().should(
        "have.value",
        employee.firstName,
      );
      PersonalDetailsPage.getMiddleNameValue().should(
        "have.value",
        employee.middleName,
      );
      PersonalDetailsPage.getLastNameValue().should(
        "have.value",
        employee.lastName,
      );
      PersonalDetailsPage.getEmployeeIdInput().should("have.value", employeeId);

      PersonalDetailsPage.fillDetails({
        otherId: employee.otherId,
        driversLicenseNumber: employee.driversLicenseNumber,
        licenseExpiryDate: employee.licenseExpiryDate,
        nationality: employee.nationality,
        dateOfBirth: employee.dateOfBirth,
        maritalStatus: employee.maritalStatus,
        gender: employee.gender,
      });
      PersonalDetailsPage.saveDetails();

      NavbarPage.logout();
      cy.url().should("include", "/auth/login");

      LoginPage.login(username, employee.password);
      NavbarPage.getUserDropdown().should("be.visible");

      MyInfoPage.visitMyInfo();

      PersonalDetailsPage.getFirstNameValue().should(
        "have.value",
        employee.firstName,
      );
      PersonalDetailsPage.getMiddleNameValue().should(
        "have.value",
        employee.middleName,
      );
      PersonalDetailsPage.getLastNameValue().should(
        "have.value",
        employee.lastName,
      );
      PersonalDetailsPage.getEmployeeIdInput().should("have.value", employeeId);
      PersonalDetailsPage.getOtherIdInput().should(
        "have.value",
        employee.otherId,
      );
      PersonalDetailsPage.getDriversLicenseInput().should(
        "have.value",
        employee.driversLicenseNumber,
      );
      PersonalDetailsPage.getLicenseExpiryInput().should(
        "have.value",
        employee.licenseExpiryDate,
      );
      PersonalDetailsPage.getNationalityDropdown().should(
        "contain.text",
        employee.nationality,
      );
      PersonalDetailsPage.getDateOfBirthInput().should(
        "have.value",
        employee.dateOfBirth,
      );
      PersonalDetailsPage.getMaritalStatusDropdown().should(
        "contain.text",
        employee.maritalStatus,
      );
      PersonalDetailsPage.getGenderOption(employee.gender)
        .find("input")
        .should("be.checked");
    });
  });
});
