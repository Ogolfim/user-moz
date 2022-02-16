import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { CreateUserPropsCodec } from '@account/domain/requiredFields/Users/register_user_props'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateUserValidator } from '@account/domain/contracts/User/CreateUser/create_user'

export const createUserPropsValidate: CreateUserValidator = (data) => {
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
      CreateUserPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
