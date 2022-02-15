import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { UpdateUserEmailPropsCodec } from '@account/domain/requiredFields/Users/update_user_email_props'
import { UpdateUserEmailValidator } from '@account/domain/contracts/User/UpdateUser/update_user_email'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export const updateUserEmailPropsValidate: UpdateUserEmailValidator = (data) => {
  return pipe(
    data,
    UpdateUserEmailPropsCodec.decode,
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
