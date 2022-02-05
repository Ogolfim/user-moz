import { UserSchema } from '@account/infra/prisma/schemas'
import * as TE from 'fp-ts/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../core/infra/HttpErrorResponse'
import { Tag } from '../requiredFields/Tag'

interface AddUserToTagsProps {
  userId: UUID
  tags: Tag[]
}

export type AddUserToTags = (props: AddUserToTagsProps) => TE.TaskEither<HttpErrorResponse, UserSchema>
