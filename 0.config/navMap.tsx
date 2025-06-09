import { ActivityIcon, Plus } from 'lucide-react'
import { BuildingIcon } from 'lucide-react'
import { CreditCardIcon } from 'lucide-react'
import { FolderIcon } from 'lucide-react'
import { GiftIcon } from 'lucide-react'
import { HeadphonesIcon } from 'lucide-react'
import { SettingsIcon } from 'lucide-react'
import { UserIcon } from 'lucide-react'
import { UsersIcon } from 'lucide-react'
import { FileTextIcon } from 'lucide-react'
// import { LucideIcon } from 'lucide-react'
import { TopNavMap } from '@/0.types/top-nav.type'
// import { USER_ROLES } from '@/0.config'

export const topNavMap: TopNavMap = {
  tenant: {
    profile: {
      title: 'Profile',
      subtitle: 'Here, you can view and manage your profile.'
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Welcome to your dashboard',
      btnText: 'Share Dossier'
    },
    candidatures: {
      title: 'Candidatures',
      subtitle: 'Here, you can view and manage your tenant dossiers.'
    },
    'dossier-management': {
      title: 'Dossier Management',
      subtitle: 'Here, you can view and manage your tenant dossiers.'
    },
    offers: {
      title: 'Offers',
      subtitle: 'Here, you can view and manage your offers.'
    },
    settings: {
      title: 'Settings',
      subtitle: 'Here, you can view and manage your settings.'
    },
    support: {
      title: 'Support',
      subtitle: 'Here, you can view and manage your support.'
    },
    payments: {
      title: 'Payments',
      subtitle: 'Here, you can view and manage your payments.'
    }
  },
  landlord: {
    profile: {
      title: 'Profile',
      subtitle: 'Here, you can view and manage your profile.'
    },
    'manage-dossier': {
      title: 'Manage Dossier',
      subtitle: 'Here, you can view and manage your dossiers.'
    },
    'candidature-details': {
      title: 'Candidature Details',
      subtitle: 'Here, you can view and manage your candidature details.'
    },
    'tenant-details': {
      title: 'Tenant Details',
      subtitle: 'Here, you can view and manage your tenant details.'
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Welcome to your dashboard',
      btnText: 'Request Dossier'
    },
    candidatures: {
      title: 'Candidatures',
      subtitle: 'Here, you can view and manage your tenant dossiers.'
    },
    'dossier-management': {
      title: 'Dossier Management',
      subtitle: 'Here, you can view and manage your tenant dossiers.'
    },
    offers: {
      title: 'Offers',
      subtitle: 'Here, you can view and manage your offers.'
    },
    tenants: {
      title: 'Tenants',
      subtitle: 'Here, you can view and manage your tenants.'
    },
    properties: {
      title: 'Properties',
      subtitle: 'Here, you can view and manage your properties.',
      btnText: 'Add Property',
      btnIcon: <Plus />
    },
    users: {
      title: 'Users',
      subtitle: 'Here, you can view and manage your users.'
    },
    settings: {
      title: 'Settings',
      subtitle: 'Here, you can view and manage your settings.'
    },
    payments: {
      title: 'Payments',
      subtitle: 'Here, you can view and manage your payments.'
    }
  },
  // add agency on TopNavMap
  agency: {
    // Not part of TopNavMap type, comment out or remove if not needed
    profile: {
      title: 'Profile',
      subtitle: 'Here, you can view and manage your profile.'
    },
    'manage-dossier': {
      title: 'Manage Dossier',
      subtitle: 'Here, you can view and manage your dossiers.'
    },
    'candidature-details': {
      title: 'Candidature Details',
      subtitle: 'Here, you can view and manage your candidature details.'
    },
    'tenant-details': {
      title: 'Tenant Details',
      subtitle: 'Here, you can view and manage your tenant details.'
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Welcome to your dashboard',
      btnText: 'Invite To Share Dossier'
    },
    candidatures: {
      title: 'Candidatures',
      subtitle: 'Here, you can view and manage your tenant dossiers.'
    },
    'dossier-management': {
      title: 'Dossier Management',
      subtitle: 'Here, you can view and manage your tenant dossiers.'
    },
    offers: {
      title: 'Offers',
      subtitle: 'Here, you can view and manage your offers.'
    },
    tenants: {
      title: 'Tenants',
      subtitle: 'Here, you can view and manage your tenants.'
    },
    properties: {
      title: 'Properties',
      subtitle: 'Here, you can view and manage your properties.',
      btnText: 'Add Property',
      btnIcon: <Plus />
    },
    users: {
      title: 'Users',
      subtitle: 'Here, you can view and manage your users.'
    },
    settings: {
      title: 'Settings',
      subtitle: 'Here, you can view and manage your settings.'
    },
    payments: {
      title: 'Payments',
      subtitle: 'Here, you can view and manage your payments.'
    }
  }
}

//
export const tenantNavItems = [
  {
    title: 'Dashboard',
    url: '/tenant/dashboard',
    icon: ActivityIcon
  },
  {
    title: 'My Profile',
    url: '/tenant/profile',
    icon: UserIcon
  },
  {
    title: 'Candidature',
    url: '/tenant/candidatures',
    icon: FolderIcon
  },
  {
    title: 'Payment History',
    url: '/tenant/payments',
    icon: CreditCardIcon
  },
  {
    title: 'Offers',
    url: '/tenant/offers',
    icon: GiftIcon
  }
]

export const agencyNavItems = [
  {
    title: 'Dashboard',
    url: '/agency/dashboard',
    icon: ActivityIcon,
    isActive: true
  },
  {
    title: 'Manage Dossier',
    url: '/agency/manage-dossier',
    icon: FileTextIcon
  },
  {
    title: 'Offers',
    url: '/agency/offers',
    icon: GiftIcon
  },
  {
    title: 'Properties',
    url: '/agency/properties',
    icon: BuildingIcon
  },
  {
    title: 'Tenents',
    url: '/agency/tenants',
    icon: UsersIcon
  },
  {
    title: 'Payments',
    url: '/agency/payments',
    icon: CreditCardIcon
  },
  {
    title: 'Offers',
    url: '/agency/offers',
    icon: GiftIcon
  }
]

export const tenantSecondaryNavItems = [
  {
    title: 'Support',
    url: '/tenant/support',
    icon: HeadphonesIcon
  },
  {
    title: 'Settings',
    url: '/tenant/settings',
    icon: SettingsIcon
  }
]

export const agencySecondaryNavItems = [
  {
    title: 'Support',
    url: '/agency/support',
    icon: HeadphonesIcon
  },
  {
    title: 'Settings',
    url: '/agency/settings',
    icon: SettingsIcon
  }
]

export const landloardNavItems = [
  {
    title: 'Dashboard',
    url: '/landlord/dashboard',
    icon: ActivityIcon,
    isActive: true
  },
  {
    title: ' Candidatures',
    url: '/landlord/candidatures',
    icon: FolderIcon,
    isActive: true
  },
  {
    title: 'Properties',
    url: '/landlord/properties',
    icon: BuildingIcon,
    isActive: true
  },
  {
    title: 'Tenants',
    url: '/landlord/tenants',
    icon: UsersIcon,
    isActive: true
  },
  {
    title: 'Payments',
    url: '/landlord/payments',
    icon: CreditCardIcon,
    isActive: true
  },
  {
    title: 'Offers',
    url: '/landlord/offers',
    icon: GiftIcon
  }
]
export const landloardSecondaryNavItems = [
  {
    title: 'Support',
    url: '/landlord/support',
    icon: HeadphonesIcon
  },
  {
    title: 'Settings',
    url: '/landlord/settings',
    icon: SettingsIcon
  }
]
