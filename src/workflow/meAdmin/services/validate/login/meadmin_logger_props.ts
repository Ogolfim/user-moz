import { MeAdminLoggerPropsCodec } from '../../../domain/requiredFields/admin/meadmin_logger_props'
import { ValidationError } from '../errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { MeAdminLoggerPropsValidate } from '../contracts/Login/meadmin_logger_props'
import { failure } from 'io-ts/lib/PathReporter'

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
