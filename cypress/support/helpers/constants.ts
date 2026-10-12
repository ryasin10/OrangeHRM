/**
 * Shared LOCATORS: only selectors reused across more than one page
 * object / helper. Selectors used in a single file stay local to that
 * file so this list doesn't drift from what's actually duplicated.
 */
export const LOCATORS = {
  menuItem: "span.oxd-main-menu-item--name",
  inputGroup: ".oxd-input-group",
  userDropdown: ".oxd-userdropdown-tab",
  fileInput: 'input[type="file"]',
  input: "input",
  label: "label",
  submitButton: 'button[type="submit"]',
  selectText: ".oxd-select-text",
  selectDropdown: ".oxd-select-dropdown",

  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',

  loginButton: ".orangehrm-login-button",
  alertMessage: ".oxd-alert-content-text",
  fieldErrorMessage: ".oxd-input-field-error-message",

  logoutLink: 'a[href="/web/index.php/auth/logout"]',
};

/**
 * Shared API_URLS: the URL patterns used by more than one
 * ApiHelper call.
 */
export const API_URLS = {
  employees: "**/api/v2/pim/employees*",
  createEmployee: "**/api/v2/pim/employees",
  personalDetails: "**/api/v2/pim/employees/*/personal-details",
};

/**
 * Relative REST paths used by cy.request for API-based test setup and cleanup.
 */
export const API_PATHS = {
  employees: "/web/index.php/api/v2/pim/employees",
  users: "/web/index.php/api/v2/admin/users",
  leaveTypes: "/web/index.php/api/v2/leave/leave-types",
  leaveEntitlements: "/web/index.php/api/v2/leave/leave-entitlements",
  leaveRequests: "/web/index.php/api/v2/leave/leave-requests",
  leaveRequestById: (requestId: number) =>
    `/web/index.php/api/v2/leave/leave-requests/${requestId}`,
  employeeLeaveRequests: (empNumber: number) =>
    `/web/index.php/api/v2/leave/employees/${empNumber}/leave-requests`,
  leaveRequestAction: (requestId: number) =>
    `/web/index.php/api/v2/leave/employees/leave-requests/${requestId}`,
} as const;

/** Credentials of the default OrangeHRM demo Admin account. */
export const ADMIN_CREDENTIALS = {
  username: "Admin",
  password: "admin123",
} as const;

/** OrangeHRM user role IDs used when creating login accounts. */
export const USER_ROLE_IDS = {
  ess: 2,
} as const;

/** Stable test data used by the leave request scenario. */
export const LEAVE_TEST_DATA = {
  leaveType: "CAN - Vacation",
  comment: "Leave API discovery",
  entitlement: 30,
} as const;
