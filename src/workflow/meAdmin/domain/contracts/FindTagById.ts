import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '../../../../core/infra/HttpErrorResponse'
import { TagSchema } from '../../infra/prisma/schemas'
import { TagId } from '../requiredFields/TagId'

export type FindTagById = (id: TagId) => TE.TaskEither<HttpErrorResponse, TagSchema | null>
