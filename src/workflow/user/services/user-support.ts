import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { sendEmailSupport } from '@core/services/email/support/sand-email-support'
import { UserSupportService } from '@user/domain/Contracts/UserSupport'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const userSupportService: UserSupportService = (data) => {
  return pipe(
    TE.tryCatch(
      async () => {
        await sendEmailSupport(data)

        return data
      },
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
