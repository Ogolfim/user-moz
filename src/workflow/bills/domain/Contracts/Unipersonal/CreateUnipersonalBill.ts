import * as TE from 'fp-ts/lib/TaskEither'
import { BillSchema } from '@bills/infra/prisma/schemas'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { UUID } from 'io-ts-types'

interface ICreateUnipersonalBill {
  unipersonalId: UUID
  services: string[]
  totalAmount: number
  nextBillableDay: Date
  note: string
}

export type CreateUnipersonalBillDB = (bill: ICreateUnipersonalBill) => Promise<BillSchema>

export type CreateUnipersonalBillService = (createUnipersonalBillDB: CreateUnipersonalBillDB) =>
(bill: ICreateUnipersonalBill) => TE.TaskEither<HttpErrorResponse, BillSchema>
