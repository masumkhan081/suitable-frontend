// import { UserRole } from "@prisma/client";
import { USER_ROLES } from '.'
import { UserRole } from '../0.types/config.type'

interface Config {
  test_auth_data: {
    email: string
    password: string
    role: UserRole
    phone: string
    countryCode: string
    firstName: string
    lastName: string
  }
  app: {
    baseUrl: string
    baseUrlClient: string
    port: number
    appName: string
  }
  database: {
    url: string
  }
  security: {
    jwt: {
      accessTokenSecret: string
      refreshTokenSecret: string
      headerKey: string
      jwt_options: {
        expiresIn: string
      }
    }
    password: {
      saltRounds: number
    }
  }
  email: {
    host: string
    port: number
    secure: boolean
    auth: {
      user: string
      pass: string
    }
    defaultFrom: string
  }
}

const config: Config = {
  test_auth_data: {
    email: 'masumkhan.technext@gmail.com',
    password: '#Pddrgj3q$',
    role: USER_ROLES.tenant,
    phone: '1234567890',
    countryCode: 'US',
    firstName: 'Masum',
    lastName: 'Khan'
  },
  app: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    baseUrlClient: process.env.BASE_URL_CLIENT || 'http://localhost:3000',
    port: Number(process.env.PORT) || 3000,
    appName: 'Clairly'
  },
  database: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/clairly?schema=public'
  },
  security: {
    jwt: {
      accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'i-act-as-token-secret',
      refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'i-act-as-refresh-token-secret',
      headerKey: process.env.JWT_HEADER_KEY || 'authorization',
      jwt_options: {
        expiresIn: '730h' // Token will expire after 30 days
      }
    },
    password: {
      saltRounds: 12
    }
  },
  email: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.HOST_EMAIL || 'masumkhan081.3s@gmail.com',
      pass: process.env.HOST_EMAIL_PASSWORD || 'tjfmkpctfemppkwh'
    },
    defaultFrom: process.env.HOST_EMAIL || ''
  }
}

export default config
