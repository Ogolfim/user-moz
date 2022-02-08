import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { MeAdminLoggerPropsValidate } from '@meAdmin/services/validate/contracts/Login/meadmin_logger_props'
import { MeAdminLoggerPropsCodec } from '@meAdmin/domain/requiredFields/admin/meadmin_logger_props'
import { ValidationError } from '@meAdmin/services/validate/errors/validation_error'

export const meAdminLoggerPropsValidate: MeAdminLoggerPropsValidate = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Nome e o email estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      MeAdminLoggerPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
