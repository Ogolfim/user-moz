import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Bill } from 'bill'
import * as TE from 'fp-ts/lib/TaskEither'

export type GetAllBillsDB = () => Promise<Bill[]>

export type GetAllBillsService = (db: GetAllBillsDB) => TE.TaskEither<HttpErrorResponse, Bill[]>
