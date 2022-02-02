import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../core/infra/Middleware'
import { clientError } from '../../../core/infra/HttpErrorResponse'
import { created } from '../../../core/infra/HttpSuccessResponse'
import { UserAdderToTagsPropsValidate } from '../services/validate/userAdderToTagsPropsValidate'
import { findUserById } from '../domain/entities/findUserById'

export const userAdderToTags: Middleware = (_httpRequest, httpBody) => {

  const { userId, tags} = httpBody

  const unValidatedUser = { userId, tags}

  const httpResponse = pipe(
    unValidatedUser,
    UserAdderToTagsPropsValidate,
    E.mapLeft(error => clientError(new Error(error.message))),
    TE.fromEither,
    TE.chain(({userId, tags}) => {

      return pipe(
        userId,
        findUserById,
        TE.chain(user => {
          return TE.tryCatch(
            async () => {
              if (!user) {
                throw new Error(`Oops! Nenhuma conta com o id ${userId} encontrada`);
              }
    
              return user;
            },
    
            notFoundUserError => clientError(notFoundUserError as Error)
          )
        }),
        TE.map(user => {

          const { name, email } = user

          const event = {
            name,
            email,
            tags
          }

          return created()
        })
      )
    })
  )


  return httpResponse
}
