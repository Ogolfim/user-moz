import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '../../../../core/infra/http_error_response'
import { prisma } from '../../infra/prisma/client'
import { UserSaver } from '../contracts/create_user'
import { findUserByEmail } from './find_user_by_email'

export const userSaver: UserSaver = ({ name, email, hash }) => {
  const newUser = pipe(
    email,
    findUserByEmail,
    TE.chain(user => {
      return TE.tryCatch(
        async () => {
          if (user) {
            throw new Error(`Oops! Já existe uma conta com o email ${email}`)
          }

          return { name, email, hash }
        },

        userFoundError => clientError(userFoundError as Error)
      )
    }),

    TE.chain(() => TE.tryCatch(
      async () => {
        return prisma.user.create({
          data: {
            name,
            hash,
            email,
            services: {
              create: {}
            }
          },
          include: {
            services: true
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
