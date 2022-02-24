import { UserSchema } from '@core/infra/prisma/schemas'

interface User {
  name: string
  email: string
  accountType: string
}

export const userView = (user: UserSchema): User => {
  return {
    name: user.name,
    email: user.email,
    accountType: user.accountType
  }
}

export const manyUsers = (users: UserSchema[]): User[] => {
  return users.map(user => userView(user))
}
