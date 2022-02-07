import * as TE from 'fp-ts/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../core/infra/http_error_response'
import { TagSchema, UserSchema } from '../../infra/prisma/schemas'

interface User extends UserSchema {
  tags: TagSchema[]
}

export type FindAllUserInfoDB = (userId: UUID) => TE.TaskEither<HttpErrorResponse, User | null>
