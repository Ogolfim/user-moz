import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateUnipersonalInfoProps } from '@account/domain/requiredFields/Users/create_unipersonal_info'
import { UnipersonalSchema } from '@account/infra/prisma/schemas'
import { Address } from 'user-moz'
import { UUID } from 'io-ts-types'

export interface UnValidatedUnipersonal {
  userId: UUID
  phone: string
  address: Address
}

export type CreateUnipersonalInfoValidator = (data: UnValidatedUnipersonal) => E.Either<ValidationError, CreateUnipersonalInfoProps>

export type CreateUnipersonalInfoDB = (user: CreateUnipersonalInfoProps) => Promise<UnipersonalSchema>

export type CreateUnipersonalInfoService = (createUnipersonalInfoDB: CreateUnipersonalInfoDB) => (user: CreateUnipersonalInfoProps) => TE.TaskEither<HttpErrorResponse, UnipersonalSchema>
