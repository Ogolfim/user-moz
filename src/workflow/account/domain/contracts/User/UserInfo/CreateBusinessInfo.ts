import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateBusinessInfoProps } from '@account/domain/requiredFields/Users/create_business_info'
import { BusinessSchema } from '@core/infra/prisma/schemas'
import { Address } from 'user-moz'
import { UUID } from 'io-ts-types'

export interface UnValidatedBusiness {
  adminId: UUID
  phone: string
  name: string
  address: Address
}

export type CreateCompanyInfoValidator = (data: UnValidatedBusiness) => E.Either<ValidationError, CreateBusinessInfoProps>

export type CreateBusinessInfoDB = (business: CreateBusinessInfoProps) => Promise<BusinessSchema>
export type GetBusinessInfoByUserIdDB = (adminId: UUID) => Promise<BusinessSchema>

export type CreateBusinessInfoService = (createCompanyInfoDB: CreateBusinessInfoDB) =>
(getCompanyInfoByUserIdDB: GetBusinessInfoByUserIdDB) => (business: CreateBusinessInfoProps) => TE.TaskEither<HttpErrorResponse, BusinessSchema>
