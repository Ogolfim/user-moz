import * as TE from 'fp-ts/TaskEither'
import { AddUserToTagsDB } from '../contracts/add_user_to_tags'
import { clientError, fail } from '../../../../core/infra/http_error_response'
import { prisma } from '../../infra/prisma/client'
import { pipe } from 'fp-ts/lib/function'
import { findUserByIdDB } from './find_user_by_id'

export const addUserToTagsDB: AddUserToTagsDB = ({ userId, tags }) => {
  const user = pipe(
    userId,
    findUserByIdDB,
    TE.chain(UserFound => {
      return TE.tryCatch(
        async () => {
          if (!UserFound) {
            throw new Error('A sua conta não foi encontrada')
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
                  connect: {
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
