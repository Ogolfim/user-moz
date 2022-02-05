import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { MeAdminRegisterProps, MeAdminRegisterPropsCodec } from '../../domain/requiredFields/admin/MeAdminRegisterProps'
import { ValidationError } from './errors/ValidationError'

interface unValidatedAdmin {
  name: string
  email: string
  password: string
}

export const meAdminRegisterPropsValidate = (data: unValidatedAdmin): E.Either<ValidationError, MeAdminRegisterProps> => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Oops! Nome, email e senha estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      MeAdminRegisterPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(errors[0].message!)),
      E.map(data => data)
    ))
  )
}
