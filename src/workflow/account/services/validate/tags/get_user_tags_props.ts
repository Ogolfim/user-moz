import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/PathReporter'
import { GetUserTagsValidator } from '@account/domain/contracts/User/Tags/GetUserTags'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { UUID } from 'io-ts-types'

export const getUserTagsPropsValidator: GetUserTagsValidator = (data) => {
  return pipe(
    data,
    UUID.decode,
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
