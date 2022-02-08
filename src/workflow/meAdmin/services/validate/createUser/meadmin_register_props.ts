import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { MeAdminRegisterPropsCodec } from '@meAdmin/domain/requiredFields/admin/meadmin_register_props'
import { MeAdminRegisterPropsValidate } from '@meAdmin/services/validate/contracts/CreateUser/meadmin_register_props_validate'
import { ValidationError } from '@meAdmin/services/validate/errors/validation_error'

export const meAdminRegisterPropsValidate: MeAdminRegisterPropsValidate = (data) => {
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
      MeAdminRegisterPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
