import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { prisma } from '@account/infra/prisma/client'
import { ResetPasswordDB } from '@account/domain/contracts/UpdateUser/reset_password'
import { findUserByIdDB } from '@account/domain/entities/findUser/find_user_by_id'

export const resetPasswordDB: ResetPasswordDB = ({ userId, hash }) => {
  const newUser = pipe(
    userId,
    findUserByIdDB,
    TE.chain(user => {
      return TE.tryCatch(
        async () => {
          if (!user) {
            throw new Error('A sua conta não foi encontrada')
          }

          return { userId, hash }
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
            hash
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
