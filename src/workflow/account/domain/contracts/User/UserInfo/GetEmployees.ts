import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { BusinessSchema, UserSchema } from '@core/infra/prisma/schemas'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export type GetEmployeesValidator = (businessAdminId: string) => E.Either<ValidationError, UUID>

export type FindBusinessByAdminIdDB = (businessAdminId: UUID) => Promise<BusinessSchema>
export type FindBusinessEmployeesDB = (businessId: string) => Promise<UserSchema[]>

export type GetEmployeesService = (findBusinessEmployeesDB: FindBusinessEmployeesDB) =>
(findBusinessByAdminIdDB: FindBusinessByAdminIdDB) => (businessAdminId: UUID) => TE.TaskEither<HttpErrorResponse, UserSchema[]>
