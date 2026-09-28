import { faker } from "@faker-js/faker";
import LoginPage from "@cypress/support/pages/login-page";
import PimListPage from "@cypress/support/pages/pim-pages/pim-list-page";
import AddEmployeeDialog, {
  NewEmployeeData,
} from "@cypress/support/pages/pim-pages/add-employee-dialog";
import PersonalDetailsPage, {
  EmployeeVerificationData,
} from "@cypress/support/pages/pim-pages/personal-details-page";
import NavbarPage from "@cypress/support/pages/pim-pages/navbar-page";
import ApiHelper from "@cypress/support/helpers/api-helpers";
import DashboardPage from "@cypress/support/pages/dashboard-page";
import MyInfoPage from "@cypress/support/pages/pim-pages/my-info-page";

describe("PIM - Add Employee with Attachment", () => {
  let createdEmployeeNumber: number | undefined;

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

    LoginPage.loginWithCommand();
    DashboardPage.verifyLoaded();

    cy.fixture("employee").then((employee) => {
      const excelFileName = `employee-data-${faker.string.alphanumeric(8)}.xlsx`;

      PimListPage.goToAddEmployee("pim");
      PimListPage.verifyAddEmployeeHeader();

      const newEmployeeData: NewEmployeeData = {
        ...employee,
        employeeId,
        username,
      };

      AddEmployeeDialog.createEmployee(
        newEmployeeData,
        "createEmployee",
        "personalDetails",
      );

      cy.url().then((url) => {
        createdEmployeeNumber = Number(url.split("/").pop());
      });

      PersonalDetailsPage.fillDetails(employee);
      PersonalDetailsPage.saveDetails("savePersonalDetails");

      PersonalDetailsPage.clickAddAttachmentButton();
      PersonalDetailsPage.uploadExcelFile(
        employee.excelFilePath,
        excelFileName,
        "uploadAttachment",
      );
      PersonalDetailsPage.verifyUploadedFileName(excelFileName);

      PersonalDetailsPage.downloadAttachment(excelFileName);

      NavbarPage.logout();
      NavbarPage.verifyLoggedOut();

      LoginPage.loginWithCommand(username, employee.password);
      NavbarPage.userDropdownVisible();

      MyInfoPage.visitMyInfo("myInfoDetails");

      const employeeVerificationData: EmployeeVerificationData = {
        ...employee,
        employeeId,
      };

      PersonalDetailsPage.verifyEmployeeInformation(employeeVerificationData);
    });
  });
});
