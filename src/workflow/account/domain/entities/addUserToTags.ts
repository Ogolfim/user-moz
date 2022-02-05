import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { AddUserToTags } from '../contracts/AddUserToTags'
import { fail } from '../../../../core/infra/HttpErrorResponse'
import { prisma } from '../../infra/prisma/client'

export const addUserToTags: AddUserToTags = ({ userId, tags }) => {
  const user = pipe(
    () => {
      const userTags = tags.map(tag => {
        return pipe(
          TE.tryCatch(
            async () => {
              return await prisma.tagUser.create({
                data: {
                  user: {
                    connect: {
                      id: userId
                    }
                  },
                  tag: {
                    connect: {
                      id: tag.id
                    }
                  }
                }
              })
            },

            (err) => {
              console.log(err)
              return fail(new Error('Oops! Erro. Por favor contacte suporte'))
            }
          )
        )
      })

      return userTags
    }
  )

  return user
}
