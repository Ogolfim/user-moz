import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '../../../../core/infra/http_error_response'
import { UserSchema } from '../../infra/prisma/schemas'
import { Email } from '../requiredFields/email'

export type FindUserByEmail = (email: Email) => TE.TaskEither<HttpErrorResponse, UserSchema | null>
