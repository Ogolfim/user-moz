import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UserRefreshTokenPropsCodec } from '../../domain/requiredFields/Users/UserRefreshTokenProps'
import { UserRefreshTokenPropsValidate } from './contracts/UserRefreshTokenPropsValidate'
import { ValidationError } from './errors/ValidationError'

export const userRefreshTokenPropsValidate: UserRefreshTokenPropsValidate = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Oops! Refresh token invalido')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      UserRefreshTokenPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(errors[0].message!)),
      E.map(data => data)
    ))
  )
}
