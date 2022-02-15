import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { BillSchema } from '@bills/infra/prisma/schemas'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@bills/services/validate/errors/validation_error'
import { ICreateBill } from '@bills/domain/requiredFields/Bills/create_Bill'

interface UnValidatedBill {
  services: Array<string>
  billPeriod: string,
  userId: string
}

export type ICreataBillValidator = (data: UnValidatedBill) => E.Either<ValidationError, ICreateBill>

export type CreateBillDB = (bill: ICreateBill) => Promise<BillSchema>

export type CreateBill = (CreateBillDB: CreateBillDB) =>
(bill: ICreateBill) => TE.TaskEither<HttpErrorResponse, BillSchema>
