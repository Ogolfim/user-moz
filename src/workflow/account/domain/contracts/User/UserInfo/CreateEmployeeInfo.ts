import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateEmployeeInfoProps } from '@account/domain/requiredFields/Users/create_Employee_info'
import { EmployeeSchema } from '@core/infra/prisma/schemas'

export interface UnValidatedEmployee {
  businessAdminId: string
  email: string
}

export type CreateEmployeeInfoValidator = (data: UnValidatedEmployee) => E.Either<ValidationError, CreateEmployeeInfoProps>

export type CreateEmployeeInfoDB = (user: CreateEmployeeInfoProps) => Promise<EmployeeSchema | null>

export type CreateEmployeeInfoService = (createEmployeeInfoDB: CreateEmployeeInfoDB) =>
(user: CreateEmployeeInfoProps) => TE.TaskEither<HttpErrorResponse, EmployeeSchema>
