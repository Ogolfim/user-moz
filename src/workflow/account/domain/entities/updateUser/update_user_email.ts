import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { prisma } from '@account/infra/prisma/client'
import { UpdateUserEmailDB } from '@account/domain/contracts/UpdateUser/update_user_email'
import { findUserByEmailDB } from '@account/domain/entities/findUser/find_user_by_email'
import { findUserByIdDB } from '@account/domain/entities/findUser/find_user_by_id'

export const updateUserEmailDB: UpdateUserEmailDB = ({ email, userId }) => {
  const newUser = pipe(
    userId,
    findUserByIdDB,
    TE.chain(user => {
      return TE.tryCatch(
        async () => {
          if (!user) {
            throw new Error('A sua conta não foi encontrada')
          }

          return { email, userId }
        },

        userFoundError => clientError(userFoundError as Error)
      )
    }),
    TE.chain(({ email, userId }) => pipe(
      email,
      findUserByEmailDB,
      TE.chain(user => {
        return TE.tryCatch(
          async () => {
            if (user) {
              throw new Error(`Oops! Este email ${email} já existe`)
            }

            return { email, userId }
          },

          userFoundError => clientError(userFoundError as Error)
        )
      })
    )),
    TE.chain(({ email, userId }) => TE.tryCatch(
      async () => {
        return prisma.user.update({
          where: {
            id: userId
          },
          data: {
            email
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
