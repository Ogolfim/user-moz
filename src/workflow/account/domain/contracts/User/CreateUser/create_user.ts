import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateUserProps } from '@account/domain/requiredFields/Users/register_user_props'
import { Name } from '@account/domain/requiredFields/name'
import { Email } from '@account/domain/requiredFields/email'
import { AccountType } from '@account/domain/requiredFields/account_type'
import { UserSchema, UserServicesSchema } from '@core/infra/prisma/schemas'
import { FindUserByEmailDB } from '@account/domain/contracts/User/FindUserByEmail'

interface UnValidatedUser {
  name: string
  email: string
  password: string
}

interface ICreateUserDB {
  name: Name
  email: Email
  hash: string
  accountType: AccountType
}

interface User extends UserSchema {
  userServices: UserServicesSchema
}

export type CreateUserValidator = (data: UnValidatedUser) => E.Either<ValidationError, CreateUserProps>

export type CreateUserDB = (user: ICreateUserDB) => Promise<User>

export type CreateUserService = (createUserDB: CreateUserDB) =>
(findUserByEmailDB: FindUserByEmailDB) => (user: CreateUserProps) => TE.TaskEither<HttpErrorResponse, User>
