import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/http_error_response'
import { prisma } from '../../infra/prisma/client'
import { FindUserByEmail } from '../contracts/find_user_by_email'

export const findUserByEmail: FindUserByEmail = (email) => {
  const user = TE.tryCatch(
    async () => {
      return await prisma.user.findUnique({
        where: { email }
      })
    },

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )

  return user
}
