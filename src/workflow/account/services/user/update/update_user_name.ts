import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { UpdateUserNameService } from '@account/domain/contracts/User/UpdateUser/update_user_name'

export const updateUserNameService: UpdateUserNameService = (updateNameDB) => (user) => {
  return TE.tryCatch(
    async () => await updateNameDB(user),

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
