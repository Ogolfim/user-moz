import * as TE from 'fp-ts/TaskEither'
import { UserSchema } from '../../../infra/prisma/schemas'
import { Email } from '../../requiredFields/email'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../../core/infra/http_error_response'

interface UpdateUserEmailProps {
  email: Email
  userId: UUID
}

export type UpdateUserEmailDB = (user: UpdateUserEmailProps) => TE.TaskEither<HttpErrorResponse, UserSchema>
