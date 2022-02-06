import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UserLoggerByPasswordPropsCodec } from '../../domain/requiredFields/Users/UserLoggerByPasswordProps'
import { UserLoggerByPasswordPropsValidate } from './contracts/UserLoggerByPasswordPropsValidate'
import { ValidationError } from './errors/ValidationError'

export const userLoggerByPasswordPropsValidate: UserLoggerByPasswordPropsValidate = (data) => {
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
