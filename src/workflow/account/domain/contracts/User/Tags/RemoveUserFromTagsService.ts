import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { TagsProps } from '@account/domain/requiredFields/Users/tags_props'
import { Tag } from '@account/domain/requiredFields/tag'
import { FindUserByIdDB } from '@account/domain/contracts/User/FindUserById'
import { UserSchema, UserServicesSchema } from '@account/infra/prisma/schemas'
import { UUID } from 'io-ts-types'

interface UnValidatedUser {
  userId: string
  tags: {
    id: string
    title: string
  }[]
}

interface User extends UserSchema {
  userService: UserServicesSchema
}

interface IRemoveUserFromTagsDB {
  userId: UUID
  tags: Tag[]
}

interface OutputRemoveUserFromTags {
  user: User
  tags: Tag[]
}

export type RemoveUserFromTagsValidator = (data: UnValidatedUser) => E.Either<ValidationError, TagsProps>

export type RemoveUserFromTagsDB = (user: IRemoveUserFromTagsDB) => Promise<IRemoveUserFromTagsDB>

export type RemoveUserFromTagsService = (removeUserFromTagsDB: RemoveUserFromTagsDB) => (findUserByIdDB: FindUserByIdDB) =>
(user: TagsProps) => TE.TaskEither<HttpErrorResponse, OutputRemoveUserFromTags>
