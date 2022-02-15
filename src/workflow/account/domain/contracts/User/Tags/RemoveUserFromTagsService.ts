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

interface IRemoveUserFromTagsDB {
  userId: UUID
  tags: Tag[]
}

export type RemoveUserFromTagsValidator = (data: UnValidatedUser) => E.Either<ValidationError, TagsProps>

export type RemoveUserFromTagsDB = (user: IRemoveUserFromTagsDB) => Promise<UserSchema>

export type RemoveUserFromTagsService = (removeUserFromTagsDB: RemoveUserFromTagsDB) =>
(user: TagsProps) => TE.TaskEither<HttpErrorResponse, UserSchema>
