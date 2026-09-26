import { faker } from "@faker-js/faker";
import LoginPage from "@cypress/support/pages/login-page";
import PimListPage from "@cypress/support/pages/pim-page/pim-list-page";
import AddEmployeeDialog from "@cypress/support/pages/pim-page/add-employee";
import PersonalDetailsPage from "@cypress/support/pages/pim-page/personal-details-page";
import NavbarPage from "@cypress/support/pages/pim-page/navbar-page";
import ApiHelper from "@cypress/support/helpers/api-helpers";
import DashboardPage from "@cypress/support/pages/dashboard-page";
import MyInfoPage from "@cypress/support/pages/pim-page/my-info-page";

describe("PIM - Add Employee with Attachment", () => {
  let createdEmployeeNumber: number | undefined;

  /**
   * Deletes the employee created during the test so it doesn't remain in
   * the system afterwards.
   */
  afterEach(() => {
    if (!createdEmployeeNumber) {
      return;
    }

    ApiHelper.createAdminSession();

    ApiHelper.delete("/web/index.php/api/v2/pim/employees", [
      createdEmployeeNumber,
    ]);

    createdEmployeeNumber = undefined;
  });

  it("TC23 - Create employee, upload/download/validate an attachment, then login as the new employee", () => {
    const employeeId = faker.string.numeric(6);
    const username = `reem${faker.string.numeric(5)}`;

    cy.login("Admin", "admin123");
    DashboardPage.verifyLoaded();

    cy.fixture("employee").then((employee) => {
      const excelFileName = `employee-data-${faker.string.alphanumeric(8)}.xlsx`;

      // 1. Create the employee.
      PimListPage.goToAddEmployee();
      PimListPage.verifyAddEmployeeHeader();

      AddEmployeeDialog.createEmployee({
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        employeeId,
        username,
        password: employee.password,
        profilePicturePath: employee.profilePicturePath,
      });

      cy.url().then((url) => {
        createdEmployeeNumber = Number(url.split("/").pop());
      });

      // 2. Fill and save Personal Details.
      PersonalDetailsPage.fillDetails(employee);
      PersonalDetailsPage.saveDetails();

      // 3. Upload and verify the Excel attachment.
      PersonalDetailsPage.clickAddAttachmentButton();
      PersonalDetailsPage.uploadExcelFile(
        employee.excelFilePath,
        excelFileName,
      );
      PersonalDetailsPage.verifyUploadedFileName(excelFileName);

      // 4. Download the uploaded Excel attachment.
      PersonalDetailsPage.downloadAttachment(excelFileName);

      // 5. Logout from the Admin account.
      NavbarPage.logout();
      NavbarPage.verifyLoggedOut();

      // 6. Login as the newly created employee.
      LoginPage.loginWithCommand(username, employee.password);
      NavbarPage.userDropdownVisible();

      // 7. Open My Info and verify the employee information.
      MyInfoPage.visitMyInfo();

      PersonalDetailsPage.verifyDetails({
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        employeeId,
        otherId: employee.otherId,
        driversLicenseNumber: employee.driversLicenseNumber,
        licenseExpiryDate: employee.licenseExpiryDate,
        nationality: employee.nationality,
        dateOfBirth: employee.dateOfBirth,
        maritalStatus: employee.maritalStatus,
        gender: employee.gender,
      });
    });
  });
});
