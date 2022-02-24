import * as TE from 'fp-ts/lib/TaskEither'
import { BillSchema } from '@core/infra/prisma/schemas'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { UUID } from 'io-ts-types'

interface ICreateStudentBill {
  services: string[]
  totalAmountToPay: number
  nextBillableDay: Date
  note: string
  studentId: UUID
}

export type CreateStudentBillDB = (bill: ICreateStudentBill) => Promise<BillSchema>

export type CreateStudentBillService = (createStudentBillDB: CreateStudentBillDB) =>
(bill: ICreateStudentBill) => TE.TaskEither<HttpErrorResponse, BillSchema>
