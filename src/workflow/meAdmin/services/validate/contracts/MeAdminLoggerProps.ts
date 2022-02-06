import * as E from 'fp-ts/lib/Either'
import { MeAdminLoggerProps } from '../../../domain/requiredFields/admin/MeAdminLoggerProps'
import { ValidationError } from '../errors/ValidationError'

interface unValidatedUser {
  email: string
  password: string
}

export type MeAdminLoggerPropsValidate = (data: unValidatedUser) =>
E.Either<ValidationError, MeAdminLoggerProps>
