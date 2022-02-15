import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { CreateRefreshTokenService } from '@account/domain/contracts/Token/create_refresh_token'
import { createRefreshAccessToken } from '@account/services/tokens/token/refresh'

export const createRefreshTokenService: CreateRefreshTokenService = (createRefreshTokenDB) => (userId) => {
  return TE.tryCatch(
    async () => {
      const refresh = await createRefreshTokenDB(userId)

      return await createRefreshAccessToken(refresh)
    },

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
