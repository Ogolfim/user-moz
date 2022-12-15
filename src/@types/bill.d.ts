declare module 'bill' {
  export interface Locales {
    pt: string
    en: string
  }

  export type Period = 'month' | 'year'

  export interface ServiceEntity {
    _id: any
    description: Locales
  }

  export interface Service {
    id: string
    description: string
  }

  export interface DiscountEntity {
    period: {
      id: Period
      name: Locales
      percentage: number
    }[],
    other?: {
      id: string
      name: Locales
      percentage: number
    }
  }

  export interface Discount {
    period: {
      id: Period
      name: string
      percentage: number
    }[],
    other?: {
      id: string
      name: string
      percentage: number
    }
  }

  export interface PricingEntity {
    _id: any
    name: Locales
    price: number
    teamMemberBaseLimit: number
    discount: DiscountEntity
    services: {
      id: string
      description: Locales
    }[]
  }

  export interface Pricing {
    id: string
    name: string
    price: number
    teamMemberBaseLimit: number
    discount: Discount
    services: Service[]
  }

  export type InvoiceIdEntity = {
    _id: any
    code: string
    createdAt: string
  }

  export interface PaymentMethod {
    id: string
    name: string
    onlyAdmin: boolean
    commission: {
      model: 'PERCENTAGE' | 'VALUE'
      value: number
    }
  }

  export interface BillPaymentMethod {
    id: string
    name: string
    commission: {
      model: string
      value: number
    },
    totalCommission: number
  }

  export type InvoiceStatus = 'PENDING' | 'COMPLETED' | 'FAILED'
  export type BillStatus = 'ACTIVE' | 'DISABLED'

  export interface Transaction {
    status: InvoiceStatus
    reference: string
    paymentMethod: BillPaymentMethod
    confirmedBy?: string
    details?: string
    startedAt: string
    completedAt?: string
  }

  export interface Invoice {
    invoiceCode: string
    pricingId: string
    teamMemberLimit: number
    subTotal: number
    discounted: number
    total: number
    period: Period
    status: InvoiceStatus
    transaction?: Transaction
    nextPayDate: string
    dueAt: string
    createdAt: string
  }

  export interface PreBill {
    userId: string
    teamMemberLimit: number
    period: Period
    pricingId: string
    invoices: Invoice[]
    status: BillStatus
    nextPayDate: string
  }

  export interface BillEntity extends PreBill {
    _id: any
    createdAt: string
  }

  export interface Bill extends PreBill {
    id: string
    createdAt: string
  }
}
