/** Request payload used to create an employee through the PIM API. */
export interface ICreateEmployeeApiRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId: string;
}

/** Request payload used to create employee login credentials. */
export interface ICreateUserApiRequest {
  username: string;
  password: string;
  empNumber: number;
  userRoleId?: number;
  status?: boolean;
}

/** Request payload used to allocate leave entitlement to an employee. */
export interface ICreateLeaveEntitlementApiRequest {
  empNumber: number;
  leaveTypeId: number;
  fromDate: string;
  toDate: string;
  entitlement: number;
}

/** Request payload used to submit a leave request. */
export interface ICreateLeaveRequestApiRequest {
  empNumber: number;
  leaveTypeId: number;
  fromDate: string;
  toDate: string;
  comment?: string | null;
}

/** Leave type item returned from the leave types API. */
export interface ILeaveTypeApiResponse {
  id: number;
  name: string;
}

/** Data prepared through APIs and reused by the leave scenario steps. */
export interface IPreparedEmployeeLeaveData {
  employeeNumber: number;
  employeeUsername: string;
  employeePassword: string;
  requestedLeaveDate: string;
  leaveTypeId: number;
}
