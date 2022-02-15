import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { prisma } from '@account/infra/prisma/client'
import { FindAllUserInfoDB } from '@account/domain/contracts/User/Login/find_all_user_info'

export const findAllUserInfoDB: FindAllUserInfoDB = (userId) => {
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
