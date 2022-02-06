import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/http_error_response'
import { prisma } from '../../infra/prisma/client'
import { FindTagById } from '../contracts/find_tag_by_id'

export const findTagById: FindTagById = (id) => {
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
