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
