import { ServiceSchema, UserSchema } from '@account/infra/prisma/schemas'

interface User extends UserSchema {
  services: ServiceSchema
}

export type CreateAccessToken = (user: User) => string
