import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { EmailCodec } from '@account/domain/requiredFields/email'
import { UpdateUserPasswordRequestValidator } from '@account/domain/contracts/User/UpdateUser/update_user_password_request'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export const resetPasswordRequestPropsValidate: UpdateUserPasswordRequestValidator = (data) => {
  return pipe(
    data,
    EmailCodec.decode,
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
