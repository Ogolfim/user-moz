import { UUID } from 'io-ts-types'
import { UserSchema, UserServicesSchema } from '@account/infra/prisma/schemas'

interface User extends UserSchema {
  userServices: UserServicesSchema
}

export type FindUserByIdDB = (id: UUID) => Promise<User | null>
