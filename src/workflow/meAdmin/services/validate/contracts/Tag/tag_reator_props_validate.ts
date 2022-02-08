import * as E from 'fp-ts/lib/Either'
import { Tag } from '../../../../domain/requiredFields/tag'
import { ValidationError } from '../../errors/validation_error'

interface unValidatedTag {
  id: string
  title: string
}

export type TagCreatorPropsValidate = (data: unValidatedTag) => E.Either<ValidationError, Tag>
