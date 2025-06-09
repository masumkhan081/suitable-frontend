export interface IProperty {
  id: number
  date: string
  property: {
    name: string
    address: string
  }
  applicant: {
    name: string
    type: 'Single' | 'Couple' | 'Roommate' | string
    phone: string
    email: string
    address: string
  }
  revenue: string
  grantor: {
    type: 'Moral' | 'Physical' | string
    amount: string
  }
  rate: {
    percentage: string
    status: 'Good' | 'Ok' | 'Not Recommended' | string
  }
  clairly_score: number
}

export interface ITenant {
  name: string
  avatar: string
  email: string
  id: number
  date: string
  property: {
    name: string
    address: string
  }
  contact: {
    phone: string
    email: string
  }
  rentAmount: string
  upcomingRent: string
}

export interface ITenantAvatar {
  id: number
  avatar: string
  name: string
}

interface Property {
  name: string
  address: string
  avatar: string
}

interface IContact {
  phone: string
  email: string
}

export enum PaymentStatus {
  Paid = 'Paid',
  Unpaid = 'Unpaid',
  Pending = 'Pending',
  PaidLate = 'PaidLate'
}

export interface IPayment {
  id: number
  name: string
  email: string
  avatar: string
  rentAmount: string
  status: string
  paymentDate: string
  paid: string[]
  tenants: ITenantAvatar[]
  property: Property
  contact: IContact
}
