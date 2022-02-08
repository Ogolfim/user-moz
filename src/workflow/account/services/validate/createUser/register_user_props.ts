import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { UserRegisterPropsCodec } from '../../../domain/requiredFields/Users/register_user_props'
import { UserRegisterPropsValidate } from '../contracts/CreateUser/register_user_props'
import { ValidationError } from '../errors/validation_error'

export const userRegisterPropsValidate: UserRegisterPropsValidate = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Nome, email e senha estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      UserRegisterPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
