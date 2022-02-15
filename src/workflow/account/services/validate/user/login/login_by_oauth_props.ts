import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { CreateOrFindUserPropsCodec } from '@account/domain/requiredFields/Users/create_or_find_user.ts'
import { CreateOrFindValidator } from '@account/domain/contracts/User/Login/CreateOrFindUser'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export const createOrFindUserPropsValidate: CreateOrFindValidator = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Nome, email e nome do servidor estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      CreateOrFindUserPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
