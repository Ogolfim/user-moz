import * as TE from 'fp-ts/TaskEither'
import { UUID } from 'io-ts-types';
import { HttpErrorResponse } from '../../../../core/infra/HttpErrorResponse';
import { AdminSchema } from '../../infra/prisma/schemas';


export type FindAdminById = (id: UUID) => TE.TaskEither<HttpErrorResponse, AdminSchema | null>