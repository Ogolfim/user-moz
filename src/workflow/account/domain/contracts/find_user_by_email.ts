import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '../../../../core/infra/http_error_response'
import { ServiceSchema, UserSchema } from '../../infra/prisma/schemas'
import { Email } from '../requiredFields/email'

interface User extends UserSchema {
  services: ServiceSchema
}

export type FindUserByEmail = (email: Email) => TE.TaskEither<HttpErrorResponse, User | null>
