
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { UserPerfilPropsValidate } from './contracts/UserPerfilPropsValidate'
import { ValidationError } from './errors/ValidationError'

export const userPerfilPropsValidate: UserPerfilPropsValidate = (id) => {
  return pipe(
    UUID.decode(id),
    E.mapLeft(errors => new ValidationError(errors[0].message!)),
    E.map(id => id)
  )
}
