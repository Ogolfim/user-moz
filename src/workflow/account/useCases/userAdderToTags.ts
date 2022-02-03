import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../core/infra/Middleware'
import { clientError } from '../../../core/infra/HttpErrorResponse'
import { created } from '../../../core/infra/HttpSuccessResponse'
import { UserAdderToTagsPropsValidate } from '../services/validate/userAdderToTagsProps'
import { accountEventProducer } from '../../../core/infra/kafka/Event'
import { addUserToTags } from '../domain/entities/addUserToTags'

export const userAdderToTags: Middleware = (_httpRequest, httpBody) => {

  const { userId, tags} = httpBody

  const unValidatedUser = { userId: "81c8ea90-a2af-492f-996f-25f74057a69d", tags}

  const httpResponse = pipe(
    unValidatedUser,
    UserAdderToTagsPropsValidate,
    E.mapLeft(error => clientError(new Error(error.message))),
    TE.fromEither,
    TE.chain((user) => {

      return pipe(
        user,
        addUserToTags,
        TE.map(user => {

          const { name, email } = user

          const event = {
            name,
            email,
            tags
          }

          // accountEventProducer({
          //   topic: 'USER_TAGS',
          //   key: 'user_added_to_tags',
          //   value: JSON.stringify(event)
          // })

          return created()
        })
      )
    })
  )


  return httpResponse
}
