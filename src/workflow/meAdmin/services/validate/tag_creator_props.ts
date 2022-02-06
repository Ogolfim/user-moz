import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/PathReporter'
import { TagCodec } from '../../domain/requiredFields/tag'
import { TagCreatorPropsValidate } from './contracts/tag_reator_props_validate'
import { ValidationError } from './errors/validation_error'

export const tagCreatorPropsValidate: TagCreatorPropsValidate = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Você deve fornecer uma tag')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      TagCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
