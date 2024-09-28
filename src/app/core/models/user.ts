import {PaginatedResult} from './pagination';
import {TableDataSource} from './table-source';

export class PaginatedUserList extends PaginatedResult {
  constructor(public pageIndex: number, public pageSize: number, public count: number, public data: UserSummary[]) {
    super(pageIndex, pageSize, count, data);
  }
}

export interface UserSummary extends TableDataSource {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  isDefaultAdmin: boolean;
  isActive: boolean;
  userRoles: string[];
  permissions: string[];
  lastLogin: Date | null;
  createdOn: Date | null;
  updatedOn: Date | null;
}

export interface UserSearchRequest {
  isFilteredQuery: boolean;
  sortField?: string;
  sortOrder?: string;
  matchPhrase?: string;
  matchPhraseField?: string;
  startTime?: string;
  endTime?: string;
  timeField?: string;
  filters?: {[key: string]: string};
  pageSize: number;
  pageIndex: number;
}

export interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  isDefaultAdmin: boolean;
  isActive: boolean;
  emailConfirmed: boolean;
  phoneNumber: string | null;
  userRoles: string[];
  permissions: string[];
  lastLogin: string;
  image: string;
  metaData: MetaData;
}

interface MetaData {
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy: string;
  updtedBy: string;
}

export enum UserRoles {
  Admin = 'Admin',
  Opeartor = 'Operator',
  Auditor = 'Auditor'
}

export interface UserFormModel {
  userName: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRoles[];
}

export interface CreateUserRequest {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRoles[];
}

export interface UserCreateResponse {
  status?: UserCreateStatus;
  error?: string;
  userId: string;
}

export enum UserCreateStatus {
  Success = 'Success',
  Failure = 'Failure'
}
