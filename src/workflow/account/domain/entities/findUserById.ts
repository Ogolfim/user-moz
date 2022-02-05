import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/HttpErrorResponse'
import { prisma } from '../../infra/prisma/client'
import { FindUserById } from '../contracts/FindUserById'

export const findUserById: FindUserById = (id) => {
  const user = TE.tryCatch(

    async () => {
      const user = await prisma.users.findUnique({
        where: { id }
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
