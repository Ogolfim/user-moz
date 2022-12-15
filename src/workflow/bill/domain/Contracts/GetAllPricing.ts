import { GetAllPricingProps } from '@bill/domain/requiredFields/get-all-pricing'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Pricing } from 'bill'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  locale: string
}

export type GetAllPricingPropsValidator = (data: Data) => E.Either<ValidationError, GetAllPricingProps>

export type GetAllPricingDB = (data: GetAllPricingProps) => Promise<Pricing[]>

export type GetAllPricingService = (db: GetAllPricingDB) => (data: GetAllPricingProps)
=> TE.TaskEither<HttpErrorResponse, Pricing[]>
