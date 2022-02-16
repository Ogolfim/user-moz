import { BillSchema, PaymentSchema } from '@account/infra/prisma/schemas'

interface Bill extends BillSchema {
  payment: PaymentSchema
}

interface Service {
  api: boolean
  webDownload: boolean
}

export type UserServices = (bill: Bill | null) => Service
