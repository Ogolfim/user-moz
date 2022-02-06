import * as E from 'fp-ts/lib/Either'
import { MeAdminRegisterProps } from '../../../domain/requiredFields/admin/MeAdminRegisterProps'
import { ValidationError } from '../errors/ValidationError'

interface unValidatedAdmin {
  name: string
  email: string
  password: string
}

export type MeAdminRegisterPropsValidate = (data: unValidatedAdmin) => E.Either<ValidationError, MeAdminRegisterProps>
