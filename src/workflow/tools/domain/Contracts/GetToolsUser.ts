import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { GetToolsUserProps } from '@tools/domain/requiredFields/get-tools-user'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { ToolsUser } from 'tools'

interface Data {
  userId: string
}

export type GetToolsUserPropsValidator = (data: Data) => E.Either<ValidationError, GetToolsUserProps>

export type GetToolsUserDB = (data: GetToolsUserProps) => Promise<ToolsUser>

export type GetToolsUserService = (db: GetToolsUserDB) =>
(data: GetToolsUserProps) => TE.TaskEither<HttpErrorResponse, ToolsUser>
