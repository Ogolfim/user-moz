import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { UpdateUserNamePropsCodec } from '../../domain/requiredFields/Users/update_user_name_props'
import { UpdateUserNamePropsValidate } from './contracts/update_user_name_props'
import { ValidationError } from './errors/validation_error'

export const updateUserNamePropsValidate: UpdateUserNamePropsValidate = (data) => {
  return pipe(
    data,
    UpdateUserNamePropsCodec.decode,
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
