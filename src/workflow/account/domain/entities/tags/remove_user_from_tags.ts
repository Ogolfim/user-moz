import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { RemoveUserFromTagsDB } from '@account/domain/contracts/Tag/remove_user_from_tags'
import { clientError, fail } from '@core/infra/http_error_response'
import { prisma } from '@account/infra/prisma/client'
import { findUserByIdDB } from '@account/domain/entities/user/findUser/find_user_by_id'

export const removeUserFromTagsDB: RemoveUserFromTagsDB = ({ userId, tags }) => {
  const user = pipe(
    userId,
    findUserByIdDB,
    TE.chain(UserFound => {
      return TE.tryCatch(
        async () => {
          if (!UserFound) {
            throw new Error('Oops! Usuário não existe')
          }

          return UserFound
        },

        userNotFoundError => clientError(userNotFoundError as Error)
      )
    }),
    TE.chain((user) => {
      return TE.tryCatch(
        async () => {
          const users = tags.map(async tag => {
            await prisma.tag.update({
              where: {
                id: tag.id
              },
              data: {
                users: {
                  disconnect: {
                    id: userId
                  }
                }
              }
            })

            return user
          })

          return await users[0]
        },
        (err) => {
          console.log(err)
          return fail(new Error('Oops! Erro. Por favor contacte suporte'))
        }
      )
    })
  )

  return user
}
