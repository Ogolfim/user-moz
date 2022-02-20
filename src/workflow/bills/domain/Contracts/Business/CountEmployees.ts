import * as TE from 'fp-ts/lib/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '@core/infra/http_error_response'

export type CountEmployeesDB = (adminId: UUID) => Promise<number>

export type CountEmployeesService = (countEmployeesDB: CountEmployeesDB) =>
(adminId: UUID) => TE.TaskEither<HttpErrorResponse, number>
