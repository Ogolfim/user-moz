import * as TE from 'fp-ts/lib/TaskEither'
import { BillSchema } from '@core/infra/prisma/schemas'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { UUID } from 'io-ts-types'

interface ICreateUnipersonalBill {
  services: string[]
  totalAmountToPay: number
  nextBillableDay: Date
  note: string
  unipersonalId: UUID
}

export type CreateUnipersonalBillDB = (bill: ICreateUnipersonalBill) => Promise<BillSchema>

export type CreateUnipersonalBillService = (createUnipersonalBillDB: CreateUnipersonalBillDB) =>
(bill: ICreateUnipersonalBill) => TE.TaskEither<HttpErrorResponse, BillSchema>
