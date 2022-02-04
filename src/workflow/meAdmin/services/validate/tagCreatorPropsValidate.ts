import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { ValidationError } from 'io-ts'
import { Tag, TagCodec } from '../../domain/requiredFields/Tag'

interface unValidatedTag {
  id: string
  title: string
}


export const tagCreatorPropsValidate = (data: unValidatedTag): E.Either<ValidationError, Tag> => {

  return pipe(
    TagCodec.decode(data),
    E.mapLeft(errors => errors[0]),
    E.map(user => user)
  )
}