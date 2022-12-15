import { GetAllPricingPropsValidator } from '@bill/domain/Contracts/GetAllPricing'
import { GetAllPricingPropsCodec } from '@bill/domain/requiredFields/get-all-pricing'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getAllPricingPropsValidator: GetAllPricingPropsValidator = (data) => {
  return pipe(
    data,
    GetAllPricingPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
