import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '../../../../core/infra/HttpErrorResponse'
import { UserSchema } from '../../infra/prisma/schemas'
import { Email } from '../requiredFields/Email'

export type FindUserByEmail = (email: Email) => TE.TaskEither<HttpErrorResponse, UserSchema | null>
