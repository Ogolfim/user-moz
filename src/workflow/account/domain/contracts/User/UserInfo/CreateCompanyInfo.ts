import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateCompanyInfoProps } from '@account/domain/requiredFields/Users/create_Company_info'
import { CompanySchema } from '@core/infra/prisma/schemas'
import { Address } from 'user-moz'
import { UUID } from 'io-ts-types'

export interface UnValidatedCompany {
  adminId: UUID
  phone: string
  name: string
  address: Address
}

export type CreateCompanyInfoValidator = (data: UnValidatedCompany) => E.Either<ValidationError, CreateCompanyInfoProps>

export type CreateCompanyInfoDB = (company: CreateCompanyInfoProps) => Promise<CompanySchema>
export type GetCompanyInfoByUserIdDB = (adminId: UUID) => Promise<CompanySchema>

export type CreateCompanyInfoService = (createCompanyInfoDB: CreateCompanyInfoDB) =>
(getCompanyInfoByUserIdDB: GetCompanyInfoByUserIdDB) => (company: CreateCompanyInfoProps) => TE.TaskEither<HttpErrorResponse, CompanySchema>
