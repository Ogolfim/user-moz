import * as TE from 'fp-ts/lib/TaskEither'
import { BillSchema } from '@core/infra/prisma/schemas'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { UUID } from 'io-ts-types'

interface ICreateStudentBill {
  studentId: UUID
  services: string[]
  totalAmount: number
  nextBillableDay: Date
  note: string
}

export type CreateStudentBillDB = (bill: ICreateStudentBill) => Promise<BillSchema>

export type CreateStudentBillService = (createStudentBillDB: CreateStudentBillDB) =>
(bill: ICreateStudentBill) => TE.TaskEither<HttpErrorResponse, BillSchema>
