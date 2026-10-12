import { faker } from "@faker-js/faker";
import LoginPage from "@cypress/support/pages/login-page";
import {
  API_PATHS,
  API_URLS,
  LEAVE_TEST_DATA,
  USER_ROLE_IDS,
} from "@cypress/support/helpers/constants";
import TestHelper from "@cypress/support/helpers/test-helper";
import type {
  ICreateEmployeeApiRequest,
  ICreateUserApiRequest,
  ICreateLeaveEntitlementApiRequest,
  ICreateLeaveRequestApiRequest,
  ILeaveTypeApiResponse,
  IPreparedEmployeeLeaveData,
} from "@cypress/support/types/leave-api";

/**
 * HTTP methods used when intercepting or sending API requests, so call
 * sites don't hardcode method strings.
 */
export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

/**
 * ApiHelper
 * Groups reusable API actions used across the test suite.
 */
export default class ApiHelper {
  /** Sends a standard API request; individual methods own their assertions. */
  private static request(
    method: HTTP_METHODS,
    url: string,
    body?: object,
  ) {
    return cy.request({ method, url, body });
  }

  /** Sends a request that must return a successful create/update status. */
  private static requestSuccess(
    method: HTTP_METHODS,
    url: string,
    body?: object,
  ) {
    return this.request(method, url, body)
      .its("status")
      .should("be.oneOf", [200, 201]);
  }

  /** Returns a future weekday that can be used for a full-day leave request. */
  private static getFutureWorkingLeaveDate() {
    const leaveDate = new Date();
    leaveDate.setDate(leaveDate.getDate() + 7);

    while ([0, 6].includes(leaveDate.getDay())) {
      leaveDate.setDate(leaveDate.getDate() + 1);
    }

    return leaveDate;
  }

  /** Returns the entitlement date range for the year of the leave date. */
  private static getLeaveEntitlementYearRange(leaveDate: Date) {
    const leaveYear = leaveDate.getFullYear();

    return {
      fromDate: `${leaveYear}-01-01`,
      toDate: `${leaveYear}-12-31`,
    };
  }

  /**
   * Intercepts an API request and assigns the given alias.
   * @param {HTTP_METHODS} method - the HTTP request method
   * @param {string} url - the API endpoint to intercept
   * @param {string} alias - the alias assigned to the intercepted request
   */
  static intercept(method: HTTP_METHODS, url: string, alias: string) {
    cy.intercept(method, url).as(alias);
  }

  /**
   * Waits for an intercepted API request and verifies its response status.
   * @param {string} alias - the alias of the intercepted request
   * @returns the intercepted request chain
   */
  static wait(alias: string) {
    return cy.wait(`@${alias}`).then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      return interception;
    });
  }

  /**
   * Sends a DELETE request using the given URL and query parameters.
   * @param {string} url - the API endpoint for the DELETE request
   * @param {number[]} ids - the employee IDs to delete
   */
  static delete(url: string, ids: number[]) {
    return this.request(HTTP_METHODS.DELETE, url, { ids })
      .its("status")
      .should("eq", 200);
  }

  /**
   * Creates an Admin session for cleanup operations.
   */
  static createAdminSession() {
    cy.session("admin-cleanup", () => {
      LoginPage.loginWithCommand();
      cy.url().should("include", "/dashboard");
    });
  }

  /**
   * Intercepts the employee list request (used when opening PIM / Add Employee).
   * @param {string} alias - the alias to assign to the intercepted request
   */
  static interceptEmployeeList(alias: string) {
    this.intercept(HTTP_METHODS.GET, API_URLS.employees, alias);
  }

  /**
   * Waits for the intercepted employee list request to complete.
   * @param {string} alias - the alias to assign to the intercepted request
   */
  static waitForEmployeeList(alias: string) {
    return this.wait(alias);
  }

  /**
   * Intercepts the create-employee request.
   * @param {string} alias - the alias to assign to the intercepted request
   */
  static interceptCreateEmployee(alias: string) {
    this.intercept(HTTP_METHODS.POST, API_URLS.createEmployee, alias);
  }

  /** Finds a leave type by its display name. */
  static getLeaveTypeByName(name: string) {
    return this.request(HTTP_METHODS.GET, API_PATHS.leaveTypes)
      .then(({ status, body }) => {
        expect(status).to.eq(200);

        const leaveType = body.data.find(
          (item: ILeaveTypeApiResponse) => item.name === name,
        );

        expect(leaveType, `${name} leave type`).to.exist;

        return leaveType;
      });
  }

  /**
   * Creates an employee through the API and returns the employee number.
   * @param {ICreateEmployeeApiRequest} data - Employee data.
   * @returns The created employee number.
   */
  static createEmployee(data: ICreateEmployeeApiRequest) {
    return this.request(HTTP_METHODS.POST, API_PATHS.employees, {
      firstName: data.firstName,
      middleName: data.middleName ?? "",
      lastName: data.lastName,
      employeeId: data.employeeId,
      empPicture: null,
    })
      .then(({ status, body }) => {
        expect(status).to.be.oneOf([200, 201]);
        expect(body.data.empNumber).to.be.a("number");

        return body.data.empNumber as number;
      });
  }

  /**
   * Creates login credentials for an employee through the API.
   * @param {ICreateUserApiRequest} data - User account data.
   * @returns The request chain after creating the user.
   */
  static createEmployeeCredentials(data: ICreateUserApiRequest) {
    return this.requestSuccess(HTTP_METHODS.POST, API_PATHS.users, {
      username: data.username,
      password: data.password,
      status: data.status ?? true,
      userRoleId: data.userRoleId ?? USER_ROLE_IDS.ess,
      empNumber: data.empNumber,
    });
  }

  /**
   * Allocates leave entitlement to an employee through the API.
   * @param {ICreateLeaveEntitlementApiRequest} data - Leave entitlement data.
   * @returns The request chain after creating the entitlement.
   */
  static createLeaveEntitlement(data: ICreateLeaveEntitlementApiRequest) {
    return this.requestSuccess(HTTP_METHODS.POST, API_PATHS.leaveEntitlements, {
      empNumber: data.empNumber,
      bulkAssign: false,
      leaveTypeId: data.leaveTypeId,
      fromDate: data.fromDate,
      toDate: data.toDate,
      entitlement: data.entitlement,
    });
  }

  /** Prepares an employee account and leave entitlement through the API. */
  static prepareEmployeeLeaveData(
    onEmployeeCreated: (employeeNumber: number) => void,
  ) {
    const employeePassword = "Password123!";
    const employeeUsername = `reem${faker.string.numeric(5)}`;
    const employeeId = faker.string.numeric(6);
    const employeeFirstName = faker.person.firstName();
    const employeeLastName = faker.person.lastName();
    const leaveDate = this.getFutureWorkingLeaveDate();
    const requestedLeaveDate = TestHelper.formatDate(leaveDate);
    const { fromDate, toDate } = this.getLeaveEntitlementYearRange(leaveDate);

    return this.getLeaveTypeByName(LEAVE_TEST_DATA.leaveType).then(
      (leaveType) =>
        this.createEmployee({
          firstName: employeeFirstName,
          lastName: employeeLastName,
          employeeId,
        }).then((employeeNumber) => {
          onEmployeeCreated(employeeNumber);

          return this.createEmployeeCredentials({
            username: employeeUsername,
            password: employeePassword,
            empNumber: employeeNumber,
          })
            .then(() =>
              this.createLeaveEntitlement({
                empNumber: employeeNumber,
                leaveTypeId: leaveType.id,
                fromDate,
                toDate,
                entitlement: LEAVE_TEST_DATA.entitlement,
              }),
            )
            .then(
              (): IPreparedEmployeeLeaveData => ({
                employeeNumber,
                employeeUsername,
                employeePassword,
                requestedLeaveDate,
                leaveTypeId: leaveType.id,
              }),
            );
        }),
    );
  }

  /**
   * Creates a leave request through the API.
   * @param {ICreateLeaveRequestApiRequest} data - Leave request data.
   * @returns The created leave request ID.
   */
  static createLeaveRequest(data: ICreateLeaveRequestApiRequest) {
    return this.request(HTTP_METHODS.POST, API_PATHS.leaveRequests, {
      leaveTypeId: data.leaveTypeId,
      fromDate: data.fromDate,
      toDate: data.toDate,
      comment: data.comment ?? null,
      duration: {
        type: "full_day",
      },
    })
      .then(({ status, body }) => {
        expect(status).to.be.oneOf([200, 201]);
        expect(body.data.id).to.be.a("number");

        return body.data.id as number;
      });
  }

  /** Creates the prepared employee leave request through the API. */
  static createLeaveRequestForEmployee(data: IPreparedEmployeeLeaveData) {
    return this.createLeaveRequest({
      empNumber: data.employeeNumber,
      leaveTypeId: data.leaveTypeId,
      fromDate: data.requestedLeaveDate,
      toDate: data.requestedLeaveDate,
      comment: LEAVE_TEST_DATA.comment,
    });
  }

  /**
   * Approves a leave request through the API.
   * @param {number} requestId - The leave request ID.
   * @returns The request chain after approving the leave.
   */
  static approveLeaveRequest(requestId: number) {
    return this.requestSuccess(
      HTTP_METHODS.PUT,
      API_PATHS.leaveRequestAction(requestId),
      {
        action: "APPROVE",
      },
    );
  }

  /** Verifies that a leave request is no longer available after cleanup. */
  static verifyLeaveRequestDeleted(requestId: number) {
    return cy
      .request({
        method: HTTP_METHODS.GET,
        url: API_PATHS.leaveRequestById(requestId),
        failOnStatusCode: false,
      })
      .its("status")
      .should("eq", 404);
  }
}
