import * as TE from 'fp-ts/lib/TaskEither'
import { BillSchema, UnipersonalSchema } from '@core/infra/prisma/schemas'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { UUID } from 'io-ts-types'

interface ICreateUnipersonalBill {
  services: string[]
  totalAmountToPay: number
  nextBillableDay: Date
  note: string
  userId: UUID
}

interface ICreateUnipersonalBillDB {
  services: string[]
  totalAmountToPay: number
  nextBillableDay: Date
  note: string
  unipersonalId: UUID
}

export type CreateUnipersonalBillDB = (bill: ICreateUnipersonalBillDB) => Promise<BillSchema>
export type FindUnipersonalByUserIdDB = (userId: UUID) => Promise<UnipersonalSchema>

export type CreateUnipersonalBillService = (createUnipersonalBillDB: CreateUnipersonalBillDB) =>
(findUnipersonalByUserIdDB: FindUnipersonalByUserIdDB) => (bill: ICreateUnipersonalBill) => TE.TaskEither<HttpErrorResponse, BillSchema>
