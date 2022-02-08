import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ServiceSchema, UserSchema } from '@account/infra/prisma/schemas'
import { Email } from '@account/domain/requiredFields/email'
import { Name } from '@account/domain/requiredFields/name'
import { ServerName } from '@account/domain/requiredFields/server_name'

interface FindOrSaveUserProps {
  name: Name
  email: Email
  serverName: ServerName
}

interface User extends UserSchema {
  services: ServiceSchema
}

export type FindOrCreateUserDB = (user: FindOrSaveUserProps) => TE.TaskEither<HttpErrorResponse, User>
