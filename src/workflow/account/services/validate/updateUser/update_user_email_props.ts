import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { UpdateUserEmailPropsCodec } from '@account/domain/requiredFields/Users/update_user_email_props'
import { UpdateUserEmailPropsValidate } from '@account/services/validate/contracts/UpdateUser/update_user_email_props'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export const updateUserEmailPropsValidate: UpdateUserEmailPropsValidate = (data) => {
  return pipe(
    data,
    UpdateUserEmailPropsCodec.decode,
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
