import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { AddUserToTagsService } from '@account/domain/contracts/User/Tags/AddUserToTags'
import { DatabaseFailError, EntityNotFoundError } from '@account/domain/entities/errors/db_error'
import { pipe } from 'fp-ts/lib/function'

export const addUserToTagsService: AddUserToTagsService = (addUserToTagsDB) => (findUserByIdDB) => (validUser) => {
  return pipe(
    TE.tryCatch(
      async () => {
        const userFound = await findUserByIdDB(validUser.userId)

        if (!userFound) {
          throw new EntityNotFoundError('Oops! A sua não foi encontrada')
        }

        return userFound
      },
      (err) => clientError(err as Error)
    ),
    TE.chain(userFound => TE.tryCatch(
      async () => {
        if (!userFound) {
          throw new EntityNotFoundError('Oops! A sua não foi encontrada')
        }

        return userFound
      },
      (err) => clientError(err as Error)
    )),
    TE.chain(user => TE.tryCatch(
      async () => {
        return {
          user,
          tags: validUser.tags
        }
      },

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
