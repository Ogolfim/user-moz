import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { UpdateUserNamePropsCodec } from '@account/domain/requiredFields/Users/update_user_name_props'
import { UpdateUserNameValidator } from '@account/domain/contracts/User/UpdateUser/update_user_name'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export const updateUserNamePropsValidate: UpdateUserNameValidator = (data) => {
  return pipe(
    data,
    UpdateUserNamePropsCodec.decode,
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
