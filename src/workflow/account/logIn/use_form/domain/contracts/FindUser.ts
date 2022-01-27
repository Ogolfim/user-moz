import * as TE from 'fp-ts/TaskEither'
import { UserSchema } from '../../../../infra/prisma/schemas';
import { Email } from '../requiredFields/Email';


export type FindUser = (email: Email) => TE.TaskEither<Error, UserSchema>