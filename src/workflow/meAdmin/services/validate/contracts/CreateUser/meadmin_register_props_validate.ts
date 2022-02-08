import * as E from 'fp-ts/lib/Either'
import { MeAdminRegisterProps } from '@meAdmin/domain/requiredFields/admin/meadmin_register_props'
import { ValidationError } from '@meAdmin/services/validate/errors/validation_error'

interface unValidatedAdmin {
  name: string
  email: string
  password: string
}

export type MeAdminRegisterPropsValidate = (data: unValidatedAdmin) => E.Either<ValidationError, MeAdminRegisterProps>
