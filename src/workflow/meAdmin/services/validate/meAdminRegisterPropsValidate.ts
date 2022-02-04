import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { ValidationError } from 'io-ts'
import { MeAdminRegisterProps, MeAdminRegisterPropsCodec } from '../../domain/requiredFields/admin/MeAdminRegisterProps'

interface unValidatedAdmin {
  name: string
  email: string
  password: string
}


export const meAdminRegisterPropsValidate = (data: unValidatedAdmin): E.Either<ValidationError, MeAdminRegisterProps> => {

  return pipe(
    MeAdminRegisterPropsCodec.decode(data),
    E.mapLeft(errors => errors[0]),
    E.map(user => user)
  )
}
