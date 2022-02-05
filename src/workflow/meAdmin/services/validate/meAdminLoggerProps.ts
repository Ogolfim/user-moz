import { MeAdminLoggerProps, MeAdminLoggerPropsCodec } from '../../domain/requiredFields/admin/meAdminLoggerProps'
import { ValidationError } from './errors/ValidationError'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'

interface unValidatedUser {
  email: string
  password: string
}

export const MeAdminLoggerPropsValidate = (data: unValidatedUser):E.Either<ValidationError, MeAdminLoggerProps> => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Oops! Nome e o email estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      MeAdminLoggerPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(errors[0].message!)),
      E.map(data => data)
    ))
  )
}
