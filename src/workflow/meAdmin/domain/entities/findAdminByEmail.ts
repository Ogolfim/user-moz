import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/HttpErrorResponse'
import { prisma } from '../../infra/prisma/client'
import { FindAdminByEmail } from '../contracts/FindAdminByEmail'

export const findAdminByEmail: FindAdminByEmail = (email) => {
  const Admin = TE.tryCatch(
    async () => {
      return await prisma.meAdmin.findUnique({
        where: { email }
      })
    },

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )

  return Admin
}
