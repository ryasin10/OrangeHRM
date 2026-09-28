/** Personal Details fields shared between filling and verifying the form. */
export interface IPersonalDetailsData {
  otherId: string;
  driversLicenseNumber: string;
  licenseExpiryDate: string;
  nationality: string;
  dateOfBirth: string;
  maritalStatus: string;
  gender: string;
}

/** Data required to create a new employee. */
export interface INewEmployeeData {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: string;
  username: string;
  password: string;
  profilePicturePath?: string;
}

/**
 * Full employee data verified on the My Info / Personal Details page,
 * including the identity fields captured when the employee was created.
 */
export interface IEmployeeVerificationData extends IPersonalDetailsData {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: string;
}
