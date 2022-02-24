import * as TE from 'fp-ts/lib/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { BillSchema } from '@core/infra/prisma/schemas'

interface ICreateBusinessBill {
  businessId: UUID
  services: string[]
  totalAmount: number
  nextBillableDay: Date
  note: string
}

export type CountEmployeesDB = (adminId: UUID) => Promise<number | null>
export type CreateBusinessBillDB = (bill: ICreateBusinessBill) => Promise<BillSchema>

export type CreateBusinessBillService = (createBusinessBillDB: CreateBusinessBillDB) =>
(bill: ICreateBusinessBill) => TE.TaskEither<HttpErrorResponse, BillSchema>
