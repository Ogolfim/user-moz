
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { failure } from 'io-ts/lib/PathReporter'
import { GetUserInfoValidator } from '@account/domain/contracts/User/UserInfo/UserInfo'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export const getUserInfoPropsValidate: GetUserInfoValidator = (id) => {
  return pipe(
    UUID.decode(id),
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
