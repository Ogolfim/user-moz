declare module 'user-moz' {
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
}
