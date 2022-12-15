import { GetBillProps } from '@bill/domain/requiredFields/get-bill'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Bill } from 'bill'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  id: string
  userId: string
}

export type GetBillPropsValidator = (data: Data) => E.Either<ValidationError, GetBillProps>

export type GetBillDB = (data: GetBillProps) => Promise<Bill>

export type GetBillService = (db: GetBillDB) =>
(data: GetBillProps) => TE.TaskEither<HttpErrorResponse, Bill>
