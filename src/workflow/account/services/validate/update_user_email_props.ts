import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { UpdateUserEmailPropsCodec } from '../../domain/requiredFields/Users/update_user_email_props'
import { UpdateUserEmailPropsValidate } from './contracts/update_user_email_props'
import { ValidationError } from './errors/validation_error'

export const updateUserEmailPropsValidate: UpdateUserEmailPropsValidate = (data) => {
  return pipe(
    data,
    UpdateUserEmailPropsCodec.decode,
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
