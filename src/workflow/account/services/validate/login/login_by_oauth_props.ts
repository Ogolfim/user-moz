import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { UserLoggerByOauthPropsCodec } from '../../../domain/requiredFields/Users/login_by_oauth_props'
import { UserLoggerByOauthPropsValidate } from '../contracts/Login/login_by_oauth_props'
import { ValidationError } from '../errors/validation_error'

export const userLoggerByOauthPropsValidate: UserLoggerByOauthPropsValidate = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Nome, email e nome do servidor estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      UserLoggerByOauthPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
