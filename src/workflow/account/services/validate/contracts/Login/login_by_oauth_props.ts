import * as E from 'fp-ts/lib/Either'
import { UserLoggerByOauthProps } from '@account/domain/requiredFields/Users/login_by_oauth_props'
import { ValidationError } from '@account/services/validate/errors/validation_error'

interface unValidatedUser {
  name: string
  email: string
  serverName: string
}

export type UserLoggerByOauthPropsValidate = (data: unValidatedUser) =>
E.Either<ValidationError, UserLoggerByOauthProps>
