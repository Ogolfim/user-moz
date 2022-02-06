import * as E from 'fp-ts/lib/Either'
import { UserAdderToTagsProps } from '../../../domain/requiredFields/Users/add_user_to_tags_props'
import { ValidationError } from '../errors/validation_error'

type Tag = {
  id: string
  title: string
}

interface unValidatedUser {
  userId: string
  tags: Tag[]
}

export type UserAdderToTagsPropsValidate = (data: unValidatedUser) =>
E.Either<ValidationError, UserAdderToTagsProps>
