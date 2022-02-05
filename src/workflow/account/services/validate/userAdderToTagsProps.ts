import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UserAdderToTagsProps, UserAdderToTagsPropsCodec } from '../../domain/requiredFields/Users/UserAdderToTagsProps'
import { ValidationError } from './errors/ValidationError'

type Tag = {
  id: string
  title: string
}

interface unValidatedUser {
  userId: string
  tags: Tag[]
}

export const UserAdderToTagsPropsValidate = (data: unValidatedUser): E.Either<ValidationError, UserAdderToTagsProps> => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Você deve fornecer id do usuário e pelo memos uma tag')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      UserAdderToTagsPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(errors[0].message!)),
      E.map(data => data)
    ))
  )
}
