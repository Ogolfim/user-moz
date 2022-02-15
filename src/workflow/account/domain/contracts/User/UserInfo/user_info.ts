import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { BillSchema, PaymentSchema, UserSchema } from '@account/infra/prisma/schemas'
import { UUID } from 'io-ts-types'

interface Bill extends BillSchema {
  payment: PaymentSchema
}

interface User extends UserSchema {
  bill: Bill
}

export type UserInfoValidator = (userId: string) => E.Either<ValidationError, UUID>

export type UserInfoDB = (userId: UUID) => Promise<User>

export type UserInfoService = (UserInfoDB: UserInfoDB) => (userId: UUID) => TE.TaskEither<HttpErrorResponse, User>
