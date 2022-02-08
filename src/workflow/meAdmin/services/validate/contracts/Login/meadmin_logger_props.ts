import * as E from 'fp-ts/lib/Either'
import { MeAdminLoggerProps } from '@meAdmin/domain/requiredFields/admin/meadmin_logger_props'
import { ValidationError } from '@meAdmin/services/validate/errors/validation_error'

interface unValidatedUser {
  email: string
  password: string
}

export type MeAdminLoggerPropsValidate = (data: unValidatedUser) =>
E.Either<ValidationError, MeAdminLoggerProps>
