import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { TagsProps } from '@account/domain/requiredFields/Users/tags_props'
import { Tag } from '@account/domain/requiredFields/tag'
import { FindUserByIdDB } from '@account/domain/contracts/User/FindUserById'
import { BillSchema, PaymentSchema, UserSchema } from '@account/infra/prisma/schemas'

interface UnValidatedUser {
  userId: string
  tags: {
    id: string
    title: string
  }[]
}

interface Bill extends BillSchema {
  payment: PaymentSchema
}

interface User extends UserSchema {
  bill: Bill
}

interface IRemoveUserFromTagsDB {
  user: User
  tags: Tag[]
}

export type RemoveUserFromTagsValidator = (data: UnValidatedUser) => E.Either<ValidationError, TagsProps>

export type RemoveUserFromTagsDB = (user: IRemoveUserFromTagsDB) => Promise<IRemoveUserFromTagsDB>

export type RemoveUserFromTagsService = (removeUserFromTagsDB: RemoveUserFromTagsDB) => (findUserByIdDB: FindUserByIdDB) =>
(user: TagsProps) => TE.TaskEither<HttpErrorResponse, IRemoveUserFromTagsDB>
