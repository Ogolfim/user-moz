import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UserLoggerByOauthPropsCodec } from '../../domain/requiredFields/Users/UserLoggerByOauthProps'
import { UserLoggerByOauthPropsValidate } from './contracts/UserLoggerByOauthPropsValidate'
import { ValidationError } from './errors/ValidationError'

export const userLoggerByOauthPropsValidate: UserLoggerByOauthPropsValidate = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Oops! Nome, email e nome do servidor estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      UserLoggerByOauthPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(errors[0].message!)),
      E.map(data => data)
    ))
  )
}
