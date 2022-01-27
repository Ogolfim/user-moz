import * as TE from 'fp-ts/TaskEither'
import { UserSchema } from '../../../infra/prisma/schemas';
import { User } from "../requiredFields/User";


export type SaveUser = (user: User) => TE.TaskEither<Error, UserSchema>