import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { ValidationError } from 'io-ts'
import { UserAdderToTagsProps, UserAdderToTagsPropsCodec } from '../../domain/requiredFields/Users/UserAdderToTagsProps'

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
    UserAdderToTagsPropsCodec.decode(data),
    E.mapLeft(errors => errors[0]),
    E.map(user => user)
  )
}
