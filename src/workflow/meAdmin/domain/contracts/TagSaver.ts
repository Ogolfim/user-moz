import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '../../../../core/infra/HttpErrorResponse'
import { TagSchema } from '../../infra/prisma/schemas'
import { Tag } from '../requiredFields/Tag'


export type TagSaver = (tag: Tag) => TE.TaskEither<HttpErrorResponse, TagSchema>