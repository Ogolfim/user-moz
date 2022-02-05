import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UserLoggerByPasswordProps, UserLoggerByPasswordPropsCodec }
  from '../../domain/requiredFields/Users/UserLoggerByPasswordProps'
import { ValidationError } from './errors/ValidationError'

interface unValidatedUser {
  email: string
  password: string
}

export const UserLoggerByPasswordPropsValidate = (data: unValidatedUser):
E.Either<ValidationError, UserLoggerByPasswordProps> => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Oops! email e senha estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      UserLoggerByPasswordPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(errors[0].message!)),
      E.map(data => data)
    ))
  )
}
