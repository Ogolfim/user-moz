import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { TagsProps } from '@account/domain/requiredFields/Users/tags_props'
import { UserSchema } from '@account/infra/prisma/schemas'
import { UUID } from 'io-ts-types'
import { Tag } from '@account/domain/requiredFields/tag'

interface UnValidatedUser {
  userId: string
  tags: {
    id: string
    title: string
  }[]
}

interface IAddUserToTagsDB {
  userId: UUID
  tags: Tag[]
}

export type AddUserToTagsValidator = (data: UnValidatedUser) => E.Either<ValidationError, TagsProps>

export type AddUserToTagsDB = (user: IAddUserToTagsDB) => Promise<UserSchema>

export type AddUserToTagsService = (addUserToTagsDB: AddUserToTagsDB) =>
(user: TagsProps) => TE.TaskEither<HttpErrorResponse, UserSchema>
