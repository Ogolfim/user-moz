import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { CreateUnipersonalInfoValidator } from '@account/domain/contracts/User/UserInfo/CreateUnipersonalInfo'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateUnipersonalInfoPropsCodec } from '@account/domain/requiredFields/Users/create_unipersonal_info'

export const createUnipersonalInfoPropsValidate: CreateUnipersonalInfoValidator = (data) => {
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
      CreateUnipersonalInfoPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
