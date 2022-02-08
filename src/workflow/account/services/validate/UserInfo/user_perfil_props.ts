
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { failure } from 'io-ts/lib/PathReporter'
import { UserPerfilPropsValidate } from '../contracts/UserInfo/user_perfil_props'
import { ValidationError } from '../errors/validation_error'

export const userPerfilPropsValidate: UserPerfilPropsValidate = (id) => {
  return pipe(
    UUID.decode(id),
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
