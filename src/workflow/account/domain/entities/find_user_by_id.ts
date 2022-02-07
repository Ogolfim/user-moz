import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/http_error_response'
import { prisma } from '../../infra/prisma/client'
import { FindUserByIdDB } from '../contracts/find_user_by_id'

export const findUserByIdDB: FindUserByIdDB = (id) => {
  const user = TE.tryCatch(

    async () => {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          services: true
        }
      })

      return user
    },

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )

  return user
}
