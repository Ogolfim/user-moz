import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { Name } from '@account/domain/requiredFields/name'
import { Email } from '@account/domain/requiredFields/email'
import { UserSchema, UserServicesSchema } from '@core/infra/prisma/schemas'
import { FindUserByEmailDB } from '@account/domain/contracts/User/FindUserByEmail'
import { CreateEmployeeProps } from '@account/domain/requiredFields/Users/create_employee_props'

interface UnValidatedEmployee {
  name: string,
  email: string,
  businessAdminId: string
}

interface ICreateEmployeeDB {
  name: Name
  email: Email
  hash: string
  businessAdminId: string
}

interface Employee extends UserSchema {
  userServices: UserServicesSchema
}

export type CreateEmployeeValidator = (data: UnValidatedEmployee) => E.Either<ValidationError, CreateEmployeeProps>

export type CreateEmployeeDB = (employee: ICreateEmployeeDB) => Promise<Employee>

export type CreateEmployeeService = (createEmployeeDB: CreateEmployeeDB) =>
(findUserByEmailDB: FindUserByEmailDB) => (employee: CreateEmployeeProps) => TE.TaskEither<HttpErrorResponse, Employee>
