import { GetBillsPropsValidator } from '@bill/domain/Contracts/GetBills'
import { GetBillsPropsCodec } from '@bill/domain/requiredFields/get-bills'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getBillsPropsValidator: GetBillsPropsValidator = (data) => {
  return pipe(
    data,
    GetBillsPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
