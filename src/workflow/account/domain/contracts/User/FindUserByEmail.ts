import { Email } from '@account/domain/requiredFields/email'
import { BillSchema, PaymentSchema, UserSchema } from '@account/infra/prisma/schemas'

interface Bill extends BillSchema {
  payment: PaymentSchema
}

interface User extends UserSchema {
  bill: Bill
}

export type FindUserByEmailDB = (email: Email) => Promise<User | null>
