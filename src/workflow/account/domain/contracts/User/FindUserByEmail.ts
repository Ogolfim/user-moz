import { Email } from '@account/domain/requiredFields/email'
import { UserSchema, UserServicesSchema } from '@account/infra/prisma/schemas'

interface User extends UserSchema {
  userServices: UserServicesSchema
}

export type FindUserByEmailDB = (email: Email) => Promise<User | null>
