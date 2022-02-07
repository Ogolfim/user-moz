import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '../../../../core/infra/http_error_response'
import { prisma } from '../../infra/prisma/client'
import { UpdateUserNameDB } from '../contracts/update_user_name'
import { findUserByIdDB } from './find_user_by_id'

export const updateUserNameDB: UpdateUserNameDB = ({ name, userId }) => {
  const newUser = pipe(
    userId,
    findUserByIdDB,
    TE.chain(user => {
      return TE.tryCatch(
        async () => {
          if (!user) {
            throw new Error('A sua conta não foi encontrada')
          }

          return { name, userId }
        },

        userFoundError => clientError(userFoundError as Error)
      )
    }),

    TE.chain(() => TE.tryCatch(
      async () => {
        return prisma.user.update({
          where: {
            id: userId
          },
          data: {
            name
          }
        })
      },

      (err) => {
        console.log(err)
        return fail(new Error('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )

  return newUser
}
