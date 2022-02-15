import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { LoginUserPropsCodec } from '@account/domain/requiredFields/Users/login_user_props'
import { LoginUserValidator } from '@account/domain/contracts/User/Login/LoginUser'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export const loginUserPropsValidate: LoginUserValidator = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Email e senha estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      LoginUserPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
