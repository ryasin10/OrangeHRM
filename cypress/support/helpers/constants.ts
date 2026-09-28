/**
 * Shared LOCATORS: only selectors reused across more than one page
 * object / helper. Selectors used in a single file stay local to that
 * file so this list doesn't drift from what's actually duplicated.
 */
export const LOCATORS = {
  menuItem: "span.oxd-main-menu-item--name", // my-info-page.ts, pim-list-page.ts
  inputGroup: ".oxd-input-group", // login-page.ts, add-employee-dialog.ts, personal-details-page.ts
  userDropdown: ".oxd-userdropdown-tab", // commands.ts, navbar-page.ts
  fileInput: 'input[type="file"]', // add-employee-dialog.ts, personal-details-page.ts
  input: "input", // add-employee-dialog.ts, personal-details-page.ts
  label: "label", // add-employee-dialog.ts, personal-details-page.ts
  submitButton: 'button[type="submit"]', // add-employee-dialog.ts, personal-details-page.ts
  selectText: ".oxd-select-text", // personal-details-page.ts
  selectDropdown: ".oxd-select-dropdown", // web-element-handler.ts
  usernameField: 'input[name="username"]', // commands.ts, login-page.ts
  passwordField: 'input[name="password"]', // commands.ts, login-page.ts
  loginButton: ".orangehrm-login-button", // commands.ts, login-page.ts
  logoutLink: 'a[href="/web/index.php/auth/logout"]', // commands.ts, navbar-page.ts
};

/**
 * Shared API_URLS: the URL patterns used by more than one
 * ApiHelper call, or centralized here because ApiHelper now exposes a
 * named method for them (see interceptEmployeeList / interceptCreateEmployee).
 */
export const API_URLS = {
  employees: "**/api/v2/pim/employees*",
  createEmployee: "**/api/v2/pim/employees",
  personalDetails: "**/api/v2/pim/employees/*/personal-details", // add-employee-dialog.ts (GET), my-info-page.ts (GET), personal-details-page.ts (PUT)
};
