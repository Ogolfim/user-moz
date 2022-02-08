import * as TE from 'fp-ts/TaskEither'
import { UserSchema } from '../../../infra/prisma/schemas'
import { Name } from '../../requiredFields/name'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../../core/infra/http_error_response'

interface UpdateUserNameProps {
  name: Name
  userId: UUID
}

export type UpdateUserNameDB = (user: UpdateUserNameProps) => TE.TaskEither<HttpErrorResponse, UserSchema>
