import * as TE from 'fp-ts/TaskEither'
import { UserSchema } from '../../../infra/prisma/schemas'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../../core/infra/http_error_response'

interface IResetPassword {
  userId: UUID
  hash: string
}

export type ResetPasswordDB = (user: IResetPassword) => TE.TaskEither<HttpErrorResponse, UserSchema>
