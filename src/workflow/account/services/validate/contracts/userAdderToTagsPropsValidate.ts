import * as E from 'fp-ts/lib/Either'
import { UserAdderToTagsProps } from '../../../domain/requiredFields/Users/UserAdderToTagsProps'
import { ValidationError } from '../errors/ValidationError'

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
