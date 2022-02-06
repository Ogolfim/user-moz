import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UserRegisterPropsCodec } from '../../domain/requiredFields/Users/UserRegisterProps'
import { UserRegisterPropsValidate } from './contracts/UserRegisterPropsValidate'
import { ValidationError } from './errors/ValidationError'

export const userRegisterPropsValidate: UserRegisterPropsValidate = (data) => {
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
      UserRegisterPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(errors[0].message!)),
      E.map(data => data)
    ))
  )
}
