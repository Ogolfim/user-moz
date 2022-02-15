import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { RemoveUserFromTagsService } from '@account/domain/contracts/User/Tags/RemoveUserFromTagsService'

export const removeUserFromTagsService: RemoveUserFromTagsService = (removeUserFromTagsDB) => (validUser) => {
  return TE.tryCatch(
    async () => await removeUserFromTagsDB(validUser),

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
