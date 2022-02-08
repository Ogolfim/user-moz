import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { TagSchema } from '@meAdmin/infra/prisma/schemas'
import { TagId } from '@meAdmin/domain/requiredFields/tag_id'

export type FindTagByIdDB = (id: TagId) => TE.TaskEither<HttpErrorResponse, TagSchema | null>
