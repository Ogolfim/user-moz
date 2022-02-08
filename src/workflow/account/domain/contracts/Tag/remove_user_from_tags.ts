import { UserSchema } from '@account/infra/prisma/schemas'
import * as TE from 'fp-ts/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { Tag } from '@account/domain/requiredFields/tag'

interface IRemoveUserFromTags {
  userId: UUID
  tags: Tag[]
}

export type RemoveUserFromTagsDB = (props: IRemoveUserFromTags) => TE.TaskEither<HttpErrorResponse, UserSchema>
