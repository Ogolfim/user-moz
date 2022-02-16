import { UUID } from 'io-ts-types'
import { BillSchema, PaymentSchema, UserSchema } from '@account/infra/prisma/schemas'

interface Bill extends BillSchema {
  payment: PaymentSchema
}

interface User extends UserSchema {
  bill: Bill
}

export type FindUserByIdDB = (id: UUID) => Promise<User | null>
