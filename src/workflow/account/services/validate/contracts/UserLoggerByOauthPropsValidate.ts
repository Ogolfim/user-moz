import * as E from 'fp-ts/lib/Either'
import { UserLoggerByOauthProps } from '../../../domain/requiredFields/Users/UserLoggerByOauthProps'
import { ValidationError } from '../errors/ValidationError'

interface unValidatedUser {
  name: string
  email: string
  serverName: string
}

export type UserLoggerByOauthPropsValidate = (data: unValidatedUser) =>
E.Either<ValidationError, UserLoggerByOauthProps>
