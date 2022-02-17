import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { DatabaseFailError } from '@account/domain/entities/errors/db_error'
import { GetUserTagsService } from '@account/domain/contracts/User/Tags/GetUserTags'

export const getUserTagsService: GetUserTagsService = (getUserTagsDB) => (validUserId) => {
  return TE.tryCatch(
    async () => {
      const tags = await getUserTagsDB(validUserId)
      return tags
    },

    (err) => {
      console.log(err)
      return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
