import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { Email } from '@account/domain/requiredFields/email'
import { BillSchema, PaymentSchema, UserSchema } from '@account/infra/prisma/schemas'
import { CreateOrFindUserProps } from '@account/domain/requiredFields/Users/create_or_find_user.ts'
import { Name } from '@account/domain/requiredFields/name'
import { ServerName } from '@account/domain/requiredFields/server_name'
import { AccountType } from '@account/domain/requiredFields/account_type'

interface Bill extends BillSchema {
  payment: PaymentSchema
}

interface User extends UserSchema {
  bill: Bill
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

export type createOrFindUserDB = (user: ICreateOrFindUser) => Promise<User>

export type CreateOrFindUserService = (createOrFindUserDb: createOrFindUserDB) =>
(user: ICreateOrFindUser) => TE.TaskEither<HttpErrorResponse, User>
