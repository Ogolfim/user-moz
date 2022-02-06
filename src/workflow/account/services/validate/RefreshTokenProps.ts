import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UserRefreshTokenProps, UserRefreshTokenPropsCodec } from '../../domain/requiredFields/Users/UserRefreshTokenProps'
import { ValidationError } from './errors/ValidationError'

interface unRefreshTokenProps {
  id: string
  userId: string
}

export const UserRefreshTokenPropsValidate = (data: unRefreshTokenProps): E.Either<ValidationError, UserRefreshTokenProps> => {
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
