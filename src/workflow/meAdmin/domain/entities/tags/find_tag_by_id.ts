import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { prisma } from '@meAdmin/infra/prisma/client'
import { FindTagByIdDB } from '@meAdmin/domain/contracts/tags/find_tag_by_id'

export const findTagByIdDB: FindTagByIdDB = (id) => {
  const tag = TE.tryCatch(

    async () => {
      const tag = await prisma.tag.findUnique({
        where: { id }
      })

      return tag
    },

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )

  return tag
}
