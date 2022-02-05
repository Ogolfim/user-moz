import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { TagSaver } from '../contracts/TagSaver'
import { clientError, fail } from '../../../../core/infra/HttpErrorResponse'
import { prisma } from '../../infra/prisma/client'
import { findTagById } from './findTagById'

export const tagSaver: TagSaver = ({ id, title }) => {
  const newTag = pipe(
    id,
    findTagById,
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
        return prisma.tags.create({
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
