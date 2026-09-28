import { faker } from "@faker-js/faker";
import LoginPage from "@cypress/support/pages/login-page";
import PimListPage from "@cypress/support/pages/pim-pages/pim-list-page";
import AddEmployeeDialog from "@cypress/support/pages/pim-pages/add-employee-dialog";
import PersonalDetailsPage from "@cypress/support/pages/pim-pages/personal-details-page";
import NavbarPage from "@cypress/support/pages/pim-pages/navbar-page";
import ApiHelper from "@cypress/support/helpers/api-helpers";
import DashboardPage from "@cypress/support/pages/dashboard-page";
import MyInfoPage from "@cypress/support/pages/pim-pages/my-info-page";
import type {
  INewEmployeeData,
  IEmployeeVerificationData,
} from "@cypress/support/types/employee-info";

describe("PIM - Add Employee with Attachment", () => {
  let createdEmployeeNumber: number | undefined;

  /** Deletes the employee created by the test (if it was created). */
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

  it("TC23 - Create employee, upload an attachment, then login and verify employee details", () => {
    const employeeId = faker.string.numeric(6);
    const username = `reem${faker.string.numeric(5)}`;

    // Steps 1-2: open the system and log in with the default credentials.
    LoginPage.loginWithCommand();
    DashboardPage.verifyLoaded();

    cy.fixture("employee").then((employee) => {
      const excelFileName = `employee-data-${faker.string.alphanumeric(8)}.xlsx`;

      // Steps 3-4: go to PIM (verified with cy.intercept) and click Add.
      PimListPage.goToAddEmployee("pim");
      PimListPage.verifyAddEmployeeHeader();

      // Step 5: fill the employee info (profile picture, username, etc.).
      const newEmployeeData: INewEmployeeData = {
        ...employee,
        employeeId,
        username,
      };

      AddEmployeeDialog.createEmployee(
        newEmployeeData,
        "createEmployee",
        "personalDetails",
      );

      // Keep the employee number so afterEach can delete the employee.
      cy.url().then((url) => {
        createdEmployeeNumber = Number(url.split("/").pop());
      });

      PersonalDetailsPage.fillDetails(employee);
      PersonalDetailsPage.saveDetails("savePersonalDetails");

      // Step 6: upload an Excel file, then download and validate it.
      PersonalDetailsPage.clickAddAttachmentButton();
      PersonalDetailsPage.uploadExcelFile(
        employee.excelFilePath,
        excelFileName,
        "uploadAttachment",
      );
      PersonalDetailsPage.verifyUploadedFileName(excelFileName);
      PersonalDetailsPage.downloadAttachment(excelFileName);

      // Step 7: log out.
      NavbarPage.logout();
      NavbarPage.verifyLoggedOut();

      // Step 8: log in with the new employee credentials.
      LoginPage.loginWithCommand(username, employee.password);
      NavbarPage.userDropdownVisible();

      MyInfoPage.visitMyInfo("myInfoDetails");

      const employeeVerificationData: IEmployeeVerificationData = {
        ...employee,
        employeeId,
      };

      PersonalDetailsPage.verifyEmployeeInformation(employeeVerificationData);
    });
  });
});
