import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UserAdderToTagsPropsCodec } from '../../domain/requiredFields/Users/UserAdderToTagsProps'
import { UserAdderToTagsPropsValidate } from './contracts/userAdderToTagsPropsValidate'
import { ValidationError } from './errors/ValidationError'

export const userAdderToTagsPropsValidate: UserAdderToTagsPropsValidate = (data) => {
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
