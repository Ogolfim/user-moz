import * as TE from 'fp-ts/lib/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { BillSchema, BusinessSchema } from '@core/infra/prisma/schemas'

interface ICreateBusinessBill {
  services: string[]
  totalAmountToPay: number
  nextBillableDay: Date
  note: string
  userId: UUID
}

interface ICreateBusinessBillDB {
  services: string[]
  totalAmountToPay: number
  nextBillableDay: Date
  note: string
  businessId: UUID
}

export type CountEmployeesDB = (adminId: UUID) => Promise<number | null>
export type CreateBusinessBillDB = (bill: ICreateBusinessBillDB) => Promise<BillSchema>
export type FindBusinessByAdminIdDB = (businessAdminId: UUID) => Promise<BusinessSchema>

export type CountEmployeesService = (countEmployeesDB: CountEmployeesDB) =>
(adminId: UUID) => TE.TaskEither<HttpErrorResponse, number>

export type CreateBusinessBillService = (createBusinessBillDB: CreateBusinessBillDB) =>
(findBusinessByAdminIdDB: FindBusinessByAdminIdDB) => (bill: ICreateBusinessBill) => TE.TaskEither<HttpErrorResponse, BillSchema>
