import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { StudentSchema, CompanySchema, UnipersonalSchema } from '@account/infra/prisma/schemas'
import { UUID } from 'io-ts-types'

interface User {
  accountType: string;
  student?: StudentSchema
  company?: CompanySchema
  unipersonal?: UnipersonalSchema
}

export type getUserInfoValidator = (userId: string) => E.Either<ValidationError, UUID>

export type GetUserInfoDB = (userId: UUID) => Promise<User>

export type getUserInfoService = (getUserInfoDB: GetUserInfoDB) =>
(userId: UUID) => TE.TaskEither<HttpErrorResponse, User>
