import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Tag, TagCodec } from '../../domain/requiredFields/Tag'
import { ValidationError } from './errors/ValidationError'

interface unValidatedTag {
  id: string
  title: string
}

export const tagCreatorPropsValidate = (data: unValidatedTag): E.Either<ValidationError, Tag> => {
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
      E.mapLeft(errors => new ValidationError(errors[0].message!)),
      E.map(data => data)
    ))
  )
}
