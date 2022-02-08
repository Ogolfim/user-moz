import * as TE from 'fp-ts/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../../core/infra/http_error_response'
import { ServiceSchema, UserSchema } from '../../../infra/prisma/schemas'

interface User extends UserSchema {
  services: ServiceSchema
}

export type FindUserByIdDB = (id: UUID) => TE.TaskEither<HttpErrorResponse, User | null>
