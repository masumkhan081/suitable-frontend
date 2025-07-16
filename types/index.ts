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

export type UserStatusFilter = 'all' | 'active' | 'verified' | 'declined';

export interface UserStats {
  total: number;
  active: number;
  verified: number;
  pending: number;
}
