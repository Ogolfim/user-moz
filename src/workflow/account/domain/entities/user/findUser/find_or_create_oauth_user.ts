import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { prisma } from '@account/infra/prisma/client'
import { FindOrCreateUserDB } from '@account/domain/contracts/User/Login/find_or_save_user'

export const findOrCreateUserDB: FindOrCreateUserDB = ({ name, email, serverName }) => {
  const user = TE.tryCatch(

    async () => {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          services: true
        }
      })

      if (user) {
        return user
      }

      return await prisma.user.create({
        data: {
          name,
          serverName,
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

    (error) => {
      console.log(error)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )

  return user
}
