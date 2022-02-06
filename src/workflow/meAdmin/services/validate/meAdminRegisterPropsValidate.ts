import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { MeAdminRegisterPropsCodec } from '../../domain/requiredFields/admin/MeAdminRegisterProps'
import { MeAdminRegisterPropsValidate } from './contracts/MeAdminRegisterPropsValidate'
import { ValidationError } from './errors/ValidationError'

export const meAdminRegisterPropsValidate: MeAdminRegisterPropsValidate = (data) => {
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
