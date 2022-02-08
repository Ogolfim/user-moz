import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { prisma } from '@meAdmin/infra/prisma/client'
import { FindAdminByIdDB } from '@meAdmin/domain/contracts/findAdmin/find_admin_by_id'

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
