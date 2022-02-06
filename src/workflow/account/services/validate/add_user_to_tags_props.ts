import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { UserAdderToTagsPropsCodec } from '../../domain/requiredFields/Users/add_user_to_tags_props'
import { UserAdderToTagsPropsValidate } from './contracts/add_user_to_tags_props_validate'
import { ValidationError } from './errors/validation_error'

export const userAdderToTagsPropsValidate: UserAdderToTagsPropsValidate = (data) => {
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
      UserAdderToTagsPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
