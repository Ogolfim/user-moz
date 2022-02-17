import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { Email } from '@account/domain/requiredFields/email'
import { UserSchema, UserServicesSchema } from '@account/infra/prisma/schemas'
import { CreateOrFindUserProps } from '@account/domain/requiredFields/Users/create_or_find_user.ts'
import { Name } from '@account/domain/requiredFields/name'
import { ServerName } from '@account/domain/requiredFields/server_name'
import { AccountType } from '@account/domain/requiredFields/account_type'

interface User extends UserSchema {
  userService: UserServicesSchema
}

interface UnValidatedUser {
  name: string
  email: string
  serverName: string
  accountType: string
}

interface ICreateOrFindUser {
  name: Name
  email: Email
  serverName: ServerName
  accountType: AccountType
}

export type CreateOrFindValidator = (user: UnValidatedUser) => E.Either<ValidationError, CreateOrFindUserProps>

export type CreateOrFindUserDB = (user: ICreateOrFindUser) => Promise<User>

export type CreateOrFindUserService = (createOrFindUserDb: CreateOrFindUserDB) =>
(user: ICreateOrFindUser) => TE.TaskEither<HttpErrorResponse, User>
