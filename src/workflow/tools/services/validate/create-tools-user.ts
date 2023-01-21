import { ValidationError } from '@core/domain/errors/validation_error'
import { CreateToolsUserPropsValidator } from '@tools/domain/Contracts/CreateToolsUser'
import { CreateToolsUserPropsCodec } from '@tools/domain/requiredFields/create-tools-user'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const createToolsUserPropsValidator: CreateToolsUserPropsValidator = (data) => {
  return pipe(
    data,
    CreateToolsUserPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
