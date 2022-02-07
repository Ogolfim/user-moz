import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/http_error_response'
import { prisma } from '../../infra/prisma/client'
import { FindAdminByIdDB } from '../contracts/find_admin_by_id'

export const findAdminByIdDB: FindAdminByIdDB = (id) => {
  const admin = TE.tryCatch(

    async () => {
      const admin = await prisma.meAdmin.findUnique({
        where: { id }
      })

      return admin
    },

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )

  return admin
}
