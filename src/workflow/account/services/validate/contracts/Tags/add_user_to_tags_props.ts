import * as E from 'fp-ts/lib/Either'
import { UserAdderToTagsProps } from '@account/domain/requiredFields/Users/add_user_to_tags_props'
import { ValidationError } from '@account/services/validate/errors/validation_error'

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
