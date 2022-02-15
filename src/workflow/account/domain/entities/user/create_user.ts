import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { prisma } from '@account/infra/prisma/client'
import { CreateUserDB } from '@account/domain/contracts/User/create_user'
import { findUserByEmailDB } from '@account/domain/entities/user/findUser/find_user_by_email'

export const createUserDB: CreateUserDB = ({ name, email, hash, accountType }) => {
  const newUser = pipe(
    email,
    findUserByEmailDB,
    TE.chain(user => {
      return TE.tryCatch(
        async () => {
          if (user) {
            throw new Error(`Oops! Já existe uma conta com o email ${email}`)
          }

          return { name, email, hash, accountType }
        },

        userFoundError => clientError(userFoundError as Error)
      )
    }),

    TE.chain((data) => TE.tryCatch(
      async () => {
        return prisma.user.create({
          data: data,
          include: {
            bill: {
              include: {
                payment: true
              }
            }
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
