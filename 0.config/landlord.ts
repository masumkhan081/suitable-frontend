// ---------------------------- All static data that landlord part uses
import { IPayment, ITenant } from '@/0.types/landlord.type'

//
export const paymentStatuses = ['Paid', 'Unpaid', 'Pending', 'PaidLate']
//
export const tenantsAll: ITenant[] = [
  {
    name: 'Corey Calzoni',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&dpr=2&q=80',
    email: 'corey.calzoni@clerk.dev',
    id: 1,
    date: '23/04/2025',
    property: { name: 'House A', address: '123 Rue de Par' },
    contact: { phone: '+1234567890', email: 'corey.calzoni@clerk.dev' },
    rentAmount: '€ 32,720',
    upcomingRent: '23/04/2025'
  },
  {
    name: 'Dick Puff',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&dpr=2&q=80',
    email: 'try@gmail.com',
    id: 2,
    date: '23/04/2025',
    property: { name: 'House A', address: '123 Rue de Par' },
    contact: { phone: '+1234567890', email: 'try@gmail.com' },
    rentAmount: '€ 32,720',
    upcomingRent: '23/04/2025'
  },
  {
    name: 'Oley Gul',
    avatar: 'https://images.unsplash.com/photo-1573497014508-93a7f4a1e70a?w=200&h=200&dpr=2&q=80',
    email: 'oley.gul@clerk.dev',
    id: 3,
    date: '23/04/2025',
    property: { name: 'House A', address: '123 Rue de Par' },
    contact: { phone: '+1234567890', email: 'oley.gul@clerk.dev' },
    rentAmount: '€ 32,720',
    upcomingRent: '23/04/2025'
  },
  {
    name: 'Promit Acaria',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&dpr=2&q=80',
    email: 'promit.acaria@clerk.dev',
    id: 4,
    date: '23/04/2025',
    property: { name: 'House A', address: '123 Rue de Par' },
    contact: { phone: '+1234567890', email: 'promit.acaria@clerk.dev' },
    rentAmount: '€ 32,720',
    upcomingRent: '23/04/2025'
  }
]

export const paymentsAll: IPayment[] = [
  {
    id: 1,
    name: 'Corey Calzoni',
    email: 'corey.calzoni@clerk.dev',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&dpr=2&q=80',
    rentAmount: '€ 32,720',
    status: 'Pending',
    paymentDate: '2025-05-06',
    paid: paymentStatuses,
    tenants: [
      { id: 1, name: 'Sophie Martin', avatar: '/avatars/avatar-15.jpg' },
      { id: 2, name: 'Leo Anderson', avatar: '/avatars/avatar-16.jpg' },
      { id: 3, name: 'Chloe Thompson', avatar: '/avatars/avatar-17.jpg' },
      { id: 4, name: 'Max Rodriguez', avatar: '/avatars/avatar-18.jpg' },
      { id: 5, name: 'Zoe Garcia', avatar: '/avatars/avatar-19.jpg' },
      { id: 6, name: 'Additional Users', avatar: '/avatars/avatar-20.jpg' }
    ],
    property: {
      name: 'House A',
      address: '123 Rue de Par',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&dpr=2&q=80'
    },
    contact: { phone: '+1234567890', email: 'corey.calzoni@clerk.dev' }
  }
]
