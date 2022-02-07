import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/http_error_response'
import { prisma } from '../../infra/prisma/client'
import { FindAllUserInfo } from '../contracts/find_all_user_info'

export const findAllUserInfo: FindAllUserInfo = (userId) => {
  const user = TE.tryCatch(

    async () => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          tags: true
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
