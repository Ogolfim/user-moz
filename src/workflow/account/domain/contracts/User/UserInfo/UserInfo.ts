import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { StudentSchema, CompanySchema, EmployeeSchema, UnipersonalSchema, AddressSchema } from '@account/infra/prisma/schemas'

interface Unipersonal extends UnipersonalSchema {
  address: AddressSchema
}

interface Student extends StudentSchema {
  address: AddressSchema
}

interface Business extends CompanySchema {
  address: AddressSchema
  employees: EmployeeSchema[]
}

interface User {
  accountType: string;
  student: Student | null
  business: Business | null
  unipersonal: Unipersonal | null
  employee: EmployeeSchema | null
}

export type GetUserInfoValidator = (userId: string) => E.Either<ValidationError, UUID>

export type GetUserInfoDB = (userId: UUID) => Promise<User>

export type getUserInfoService = (getUserInfoDB: GetUserInfoDB) =>
(userId: UUID) => TE.TaskEither<HttpErrorResponse, User>
