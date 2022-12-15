import { GetBillsProps } from '@bill/domain/requiredFields/get-bills'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Bill } from 'bill'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  userId: string
}

export type GetBillsPropsValidator = (data: Data) => E.Either<ValidationError, GetBillsProps>

export type GetBillsDB = (data: GetBillsProps) => Promise<Bill[]>

export type GetBillsService = (db: GetBillsDB) =>
(data: GetBillsProps) => TE.TaskEither<HttpErrorResponse, Bill[]>
