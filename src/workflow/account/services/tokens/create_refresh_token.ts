import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, fail } from '@core/infra/http_error_response'
import { CreateRefreshTokenService } from '@account/domain/contracts/Token/create_refresh_token'
import { createRefreshAccessToken } from '@account/services/tokens/token/refresh'
import { DatabaseFailError, EntityNotFoundError } from '@account/domain/entities/errors/db_error'

export const createRefreshTokenService: CreateRefreshTokenService = (createRefreshTokenDB) => (findUserByIdDB) => (userId) => {
  return pipe(
    TE.tryCatch(
      async () => {
        const userFound = await findUserByIdDB(userId)

        if (!userFound) {
          throw new EntityNotFoundError('Oops! A sua não foi encontrada')
        }

        return userFound
      },
      (err) => clientError(err as Error)
    ),
    TE.chain(user => TE.tryCatch(
      async () => {
        const refreshDB = await createRefreshTokenDB(userId)

        const refresh = await createRefreshAccessToken(refreshDB)

        return {
          user,
          refreshToken: refresh
        }
      },

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
