import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { GetToolsUserService } from '@tools/domain/Contracts/GetToolsUser'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getToolsUserService: GetToolsUserService = (getToolsUserDB) => (data) => {
  return pipe(
    TE.tryCatch(
      async () => getToolsUserDB(data),
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    )
  )
}
