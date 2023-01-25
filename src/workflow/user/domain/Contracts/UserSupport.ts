import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { UserSupportProps } from '@user/domain/requiredFields/user-support'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  name: string
  email: string
  phoneNumber: string
  service: string
  message: string
}

export type UserSupportPropsValidator = (data: Data) => E.Either<ValidationError, UserSupportProps>

export type UserSupportService = (data: UserSupportProps) => TE.TaskEither<HttpErrorResponse, UserSupportProps>
