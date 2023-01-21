import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { CreateToolsUserProps } from '@tools/domain/requiredFields/create-tools-user'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { ToolsUser } from 'tools'

interface Data {
  userId: string
}

export type CreateToolsUserPropsValidator = (data: Data) => E.Either<ValidationError, CreateToolsUserProps>

export type CreateToolsUserDB = (data: CreateToolsUserProps) => Promise<ToolsUser>

export type CreateToolsUserService = (db: CreateToolsUserDB) =>
(data: CreateToolsUserProps) => TE.TaskEither<HttpErrorResponse, ToolsUser>
