import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { TagsPropsCodec } from '@account/domain/requiredFields/Users/tags_props'
import { RemoveUserFromTagsValidator } from '@account/domain/contracts/User/Tags/RemoveUserFromTagsService'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export const removeUserFromTagsPropsValidator: RemoveUserFromTagsValidator = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Você deve fornecer id do usuário e pelo memos uma tag')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      TagsPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
