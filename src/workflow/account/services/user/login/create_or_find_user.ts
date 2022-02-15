import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { CreateOrFindUserService } from '@account/domain/contracts/User/Login/CreateOrFindUser'

export const createOrFindUserService: CreateOrFindUserService = (createOrFindUserDB) => (validUser) => {
  return TE.tryCatch(
    async () => {
      const user = await createOrFindUserDB(validUser)

      return user
    },

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
