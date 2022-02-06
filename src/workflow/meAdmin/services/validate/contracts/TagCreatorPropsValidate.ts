import * as E from 'fp-ts/lib/Either'
import { Tag } from '../../../domain/requiredFields/Tag'
import { ValidationError } from '../errors/ValidationError'

interface unValidatedTag {
  id: string
  title: string
}

export type TagCreatorPropsValidate = (data: unValidatedTag) => E.Either<ValidationError, Tag>
