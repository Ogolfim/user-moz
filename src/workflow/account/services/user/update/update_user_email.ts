import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { UpdateUserEmailService } from '@account/domain/contracts/User/UpdateUser/update_user_email'
import { DatabaseFailError } from '@account/domain/entities/errors/db_error'

export const updateUserEmailService: UpdateUserEmailService = (updateUserEmailDB) => (user) => {
  return TE.tryCatch(
    async () => await updateUserEmailDB(user),

    (err) => {
      console.log(err)
      return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
