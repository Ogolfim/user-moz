
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { ValidationError } from 'io-ts'
import { UUID } from 'io-ts-types'

export const UserPerfilPropsValidate = (id: string):
E.Either<ValidationError, UUID> => {
  return pipe(
    UUID.decode(id),
    E.mapLeft(errors => errors[0]),
    E.map(id => id)
  )
}
