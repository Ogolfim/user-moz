import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { AddUserToTagsService } from '@account/domain/contracts/User/Tags/AddUserToTags'
import { DatabaseFailError } from '@account/domain/entities/errors/db_error'

export const addUserToTagsService: AddUserToTagsService = (addUserToTagsDB) => (validUser) => {
  return TE.tryCatch(
    async () => await addUserToTagsDB(validUser),

    (err) => {
      console.log(err)
      return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
