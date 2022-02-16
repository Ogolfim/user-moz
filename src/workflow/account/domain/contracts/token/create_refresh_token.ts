import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { BillSchema, PaymentSchema, RefreshTokenSchema, UserSchema } from '@account/infra/prisma/schemas'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { UUID } from 'io-ts-types'
import { FindUserByIdDB } from '@account/domain/contracts/User/FindUserById'

interface Bill extends BillSchema {
  payment: PaymentSchema
}

interface User extends UserSchema {
  bill: Bill
}

interface Result {
  user: User
  refreshToken: string
}

export type CreateRefreshTokenValidator = (userId: string) => E.Either<ValidationError, UUID>

export type CreateRefreshTokenDB = (userId: UUID) => Promise<RefreshTokenSchema>

export type CreateRefreshTokenService = (createRefreshTokenDB: CreateRefreshTokenDB) =>
(findUserByIdDB: FindUserByIdDB) => (userId: UUID) => TE.TaskEither<HttpErrorResponse, Result>
