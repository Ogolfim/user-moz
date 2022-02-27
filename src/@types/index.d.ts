declare module 'user-moz' {
  import { Decimal as D } from '@prisma/client/runtime'

  export interface Address {
    country: string
    provinceOrState: string
    city: string
    address1: string
    address2: string
    postcode: string
  }

  export type PaymentStatus = 'PADDING' | 'PAYED' | 'FAILED'

  export type BillStatus = 'PADDING' | 'PAYED' | 'FAILED'

  export type Decimal = D
}
