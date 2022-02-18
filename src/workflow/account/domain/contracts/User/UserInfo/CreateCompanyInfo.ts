import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateCompanyInfoProps } from '@account/domain/requiredFields/Users/create_Company_info'
import { CompanySchema } from '@account/infra/prisma/schemas'
import { Address } from 'user-moz'
import { UUID } from 'io-ts-types'

export interface UnValidatedCompany {
  userId: UUID
  phone: string
  name: string
  address: Address
}

export type CreateCompanyInfoValidator = (data: UnValidatedCompany) => E.Either<ValidationError, CreateCompanyInfoProps>

export type CreateCompanyInfoDB = (user: CreateCompanyInfoProps) => Promise<CompanySchema>
export type GetCompanyInfoByUserIdDB = (userId: UUID) => Promise<CompanySchema>

export type CreateCompanyInfoService = (createCompanyInfoDB: CreateCompanyInfoDB) =>
(getCompanyInfoByUserIdDB: GetCompanyInfoByUserIdDB) => (user: CreateCompanyInfoProps) => TE.TaskEither<HttpErrorResponse, CompanySchema>
