export interface UserStatus {
  ageVerified: boolean;
  incomeVerified: boolean;
  identityVerified: boolean;
}

export interface User {
  id: string;
  'First Name': string;
  'Last Name': string;
  Age: string;
  Gender: string;
  Email: string;
  Phone: string;
  Address: string;
  Status: UserStatus;
  Revenue: string;
  Rent: string;
  Deposit: string;
  Total: string;
  [key: string]: any; // For dynamic property access
}

export type UserStatusFilter = 'all' | 'active' | 'verified' | 'declined' | 'pending' | 'inactive' | 'deactivated' | 'deleted';

export interface UserStats {
  total: number;
  active: number;
  verified: number;
  pending: number;
  declined: number;
  inactive: number;
  deactivated: number;
  deleted: number;
}
