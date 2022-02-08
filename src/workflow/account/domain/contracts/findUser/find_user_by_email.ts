import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ServiceSchema, UserSchema } from '@account/infra/prisma/schemas'
import { Email } from '@account/domain/requiredFields/email'

interface User extends UserSchema {
  services: ServiceSchema
}

export type FindUserByEmailDB = (email: Email) => TE.TaskEither<HttpErrorResponse, User | null>
