import ApiHelper from "@cypress/support/helpers/api-helpers";
import type { IPreparedEmployeeLeaveData } from "@cypress/support/types/leave-api";
import LoginPage from "@cypress/support/pages/login-page";
import DashboardPage from "@cypress/support/pages/dashboard-page";
import { API_PATHS } from "@cypress/support/helpers/constants";
import NavbarPage from "@cypress/support/pages/pim-pages/navbar-page";
import LeavePage from "@cypress/support/pages/leave-page";
import TestHelper from "@cypress/support/helpers/test-helper";

describe("Leave API Discovery", () => {
  let createdEmployeeNumber: number | undefined;
  let leaveRequestId: number | undefined;
  let employeeData: IPreparedEmployeeLeaveData | undefined;

  beforeEach(() => {
    ApiHelper.createAdminSession();
    DashboardPage.open();
  });

  afterEach(() => {
    if (!createdEmployeeNumber) {
      return;
    }

    TestHelper.clearCookies();

    LoginPage.loginWithCommand();
    DashboardPage.verifyLoaded();

    ApiHelper.delete(API_PATHS.employees, [createdEmployeeNumber]);

    const requestId = leaveRequestId;
    if (requestId !== undefined) {
      ApiHelper.verifyLeaveRequestDeleted(requestId);
    }

    createdEmployeeNumber = undefined;
    leaveRequestId = undefined;
  });

  it("TC24 - creates and approves an employee leave request", () => {
    // Prepare an employee account with leave entitlement through APIs.
    ApiHelper.prepareEmployeeLeaveData((employeeNumber) => {
      createdEmployeeNumber = employeeNumber;
    })
      .then(
        (data) => {
          employeeData = data;

          // Log in as the prepared employee and submit the leave request by API.
          NavbarPage.logout();
          LoginPage.verifyLoaded();

          LoginPage.loginWithCommand(
            data.employeeUsername,
            data.employeePassword,
          );
          DashboardPage.verifyLoaded();

          return ApiHelper.createLeaveRequestForEmployee(data).then(
            (requestId) => {
              leaveRequestId = requestId;
            },
          );
        },
      )
      .then(() => {
        // Log in as Admin and approve the employee leave request by API.
        NavbarPage.logout();

        LoginPage.verifyLoaded();

        LoginPage.loginWithCommand();

        DashboardPage.verifyLoaded();

        if (leaveRequestId === undefined) {
          throw new Error("Leave request ID was not created");
        }

        return ApiHelper.approveLeaveRequest(leaveRequestId);
      })
      .then(() => {
        // Log in as the employee and verify the approved leave in My Leave.
        NavbarPage.logout();
        LoginPage.verifyLoaded();

        if (!employeeData) {
          throw new Error("Employee leave data was not prepared");
        }

        LoginPage.loginWithCommand(
          employeeData.employeeUsername,
          employeeData.employeePassword,
        );
        DashboardPage.verifyLoaded();

        LeavePage.openLeaveMenu();
        LeavePage.openMyLeave();
        LeavePage.verifyMyLeavePage();
        LeavePage.verifyScheduledLeave(employeeData.requestedLeaveDate);
      });
  });
});
