import { ValidationError } from '@core/domain/errors/validation_error'
import { GetToolsUserPropsValidator } from '@tools/domain/Contracts/GetToolsUser'
import { GetToolsUserPropsCodec } from '@tools/domain/requiredFields/get-tools-user'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getToolsUserPropsValidator: GetToolsUserPropsValidator = (data) => {
  return pipe(
    data,
    GetToolsUserPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
