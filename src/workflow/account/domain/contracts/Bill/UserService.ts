import { BillSchema, PaymentSchema } from '@account/infra/prisma/schemas'

interface Bill extends BillSchema {
  services: string[]
  payment: PaymentSchema
}

interface Service {
  api: boolean
  webDownload: boolean
}

export type UserServices = (bill: Bill) => Service
