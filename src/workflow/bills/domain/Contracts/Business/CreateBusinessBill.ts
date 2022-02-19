import * as TE from 'fp-ts/lib/TaskEither'
import { BillSchema } from '@bills/infra/prisma/schemas'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { UUID } from 'io-ts-types'

interface ICreateBusinessBill {
  businessId: UUID
  services: string[]
  totalAmount: number
  nextBillableDay: Date
  note: string
}

export type CreateBusinessBillDB = (bill: ICreateBusinessBill) => Promise<BillSchema>

export type CreateBusinessBillService = (createBusinessBillDB: CreateBusinessBillDB) =>
(bill: ICreateBusinessBill) => TE.TaskEither<HttpErrorResponse, BillSchema>
