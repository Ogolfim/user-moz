import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { ResetPasswordPropsCodec } from '../../../domain/requiredFields/Users/reset_password_props'
import { ResetPasswordPropsValidate } from '../contracts/UpdateUser/reset_password_props_validate'
import { ValidationError } from '../errors/validation_error'

export const resetPasswordPropsValidate: ResetPasswordPropsValidate = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('informações em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      ResetPasswordPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
