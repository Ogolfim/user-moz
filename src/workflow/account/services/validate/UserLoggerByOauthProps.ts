import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { ValidationError } from 'io-ts'
import { UserLoggerByOauthProps, UserLoggerByOauthPropsCodec } from '../../domain/requiredFields/Users/UserLoggerByOauthProps'

interface unValidatedUser {
  name: string
  email: string
  serverName: string
}


export const UserLoggerByOauthPropsValidate = (data: unValidatedUser): E.Either<ValidationError, UserLoggerByOauthProps> => {

  return pipe(
    UserLoggerByOauthPropsCodec.decode(data),
    E.mapLeft(errors => errors[0]),
    E.map(user => user)
  )
}