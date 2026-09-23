import { faker } from "@faker-js/faker";
import LoginPage from "@cypress/support/pages/login-page";
import PimListPage from "@cypress/support/pages/pim-page/pim-list-page";
import AddEmployeePage from "@cypress/support/pages/pim-page/add-employee";
import PersonalDetailsPage from "@cypress/support/pages/pim-page/personal-details-page";
import NavbarPage from "@cypress/support/pages/pim-page/navbar-page";
import MyInfoPage from "@cypress/support/pages/pim-page/my-info-page";

describe("PIM Page Test", () => {
  it("TC22 - Create employee and verify information", () => {
    const employeeId = faker.string.numeric(6);
    const username = `reem${faker.string.numeric(5)}`;

    LoginPage.visit();
    LoginPage.login("Admin", "admin123");

    PimListPage.goToAddEmployee();
    PimListPage.AddEmployeeHeader();

    cy.fixture("employee").then((employee) => {
      AddEmployeePage.createEmployee({
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        employeeId: employeeId,
        username: username,
        password: employee.password,
      });

      PersonalDetailsPage.getFirstNameValue(employee.firstName);
      PersonalDetailsPage.getMiddleNameValue(employee.middleName);
      PersonalDetailsPage.getLastNameValue(employee.lastName);
      PersonalDetailsPage.getEmployeeIdInput(employeeId);

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
      NavbarPage.verifyLoggedOut();

      LoginPage.login(username, employee.password);
      NavbarPage.userDropdownVisible();

      MyInfoPage.visitMyInfo();

      PersonalDetailsPage.getFirstNameValue(employee.firstName);
      PersonalDetailsPage.getMiddleNameValue(employee.middleName);
      PersonalDetailsPage.getLastNameValue(employee.lastName);
      PersonalDetailsPage.getEmployeeIdInput(employeeId);
      PersonalDetailsPage.getOtherIdInput(employee.otherId);
      PersonalDetailsPage.getDriversLicenseInput(employee.driversLicenseNumber);
      PersonalDetailsPage.getLicenseExpiryInput(employee.licenseExpiryDate);
      PersonalDetailsPage.getNationalityDropdown(employee.nationality);
      PersonalDetailsPage.getDateOfBirthInput(employee.dateOfBirth);
      PersonalDetailsPage.getMaritalStatusDropdown(employee.maritalStatus);
    });
  });
});
