import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { CreateTagDB } from '../contracts/create_tag'
import { clientError, fail } from '../../../../core/infra/http_error_response'
import { prisma } from '../../infra/prisma/client'
import { findTagByIdDB } from './find_tag_by_id'

export const createTagDB: CreateTagDB = ({ id, title }) => {
  const newTag = pipe(
    id,
    findTagByIdDB,
    TE.chain(tag => {
      return TE.tryCatch(
        async () => {
          if (tag) {
            throw new Error(`Oops! A tag ${id} já existe`)
          }

          return { id, title }
        },

        userFoundError => clientError(userFoundError as Error)
      )
    }),

    TE.chain(() => TE.tryCatch(
      async () => {
        return prisma.tag.create({
          data: {
            id,
            title
          }
        })
      },

      (err) => {
        console.log(err)
        return fail(new Error('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
  return newTag
}
