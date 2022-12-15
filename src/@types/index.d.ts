declare module 'mozeconomia' {
  export type Locale = 'pt' | 'en'

  export interface Locales {
    pt: string
    en: string
  }

  export interface Session {
    id: string
    sessionToken: string
    userId: string
    expires: string
  }

  export interface SessionEntity {
    _id: any
    sessionToken: string
    userId: string
    expires: string
  }

  export interface Address {
    address1: string
    streetAddress: string
    cityOrDistrict: string
    provinceOrState: string
    postalCode: string
    country: string
    updatedAt: string
  }

  export interface User {
    id: string
    email: string
    name?: string
    phoneNumber?: string
    image?: string
    emailVerified?: string
    admin?: boolean
    address?: Address
    teamId?: string
    updatedAt: string
  }

  export interface ServiceEntity {
    _id: any
    description: Locales
  }

  export interface Service {
    id: string
    description: string
  }

  export interface TeamEntity {
    _id: string
    name: string
    teamMemberLimit: number
    services: ServiceEntity[]
    members: {
      userId: string
    }[]
    companyName?: string
  }

  export interface Team {
    id: string
    name: string
    memberLimit: number
    services: Service[]
    members: {
      userId: string
    }[]
    companyName?: string
  }

  export interface UserEntity {
    _id: any
    email: string
    name?: string
    phoneNumber?: string
    image?: string
    emailVerified?: string
    address?: Address
    admin?: boolean
    updatedAt: string
  }
}
