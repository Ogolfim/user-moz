import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '../../../../core/infra/http_error_response'
import { TagSchema } from '../../infra/prisma/schemas'
import { TagId } from '../requiredFields/tag_id'

export type FindTagByIdDB = (id: TagId) => TE.TaskEither<HttpErrorResponse, TagSchema | null>
