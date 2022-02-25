import * as TE from 'fp-ts/lib/TaskEither'
import { BillSchema, StudentSchema } from '@core/infra/prisma/schemas'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { UUID } from 'io-ts-types'

interface ICreateStudentBill {
  services: string[]
  totalAmountToPay: number
  nextBillableDay: Date
  note: string
  userId: UUID
}

interface ICreateStudentBillDB {
  services: string[]
  totalAmountToPay: number
  nextBillableDay: Date
  note: string
  studentId: UUID
}

export type CreateStudentBillDB = (bill: ICreateStudentBillDB) => Promise<BillSchema>
export type FindStudentByUserIdDB = (userId: UUID) => Promise<StudentSchema>

export type CreateStudentBillService = (createStudentBillDB: CreateStudentBillDB) =>
(findStudentByUserIdDB: FindStudentByUserIdDB) => (bill: ICreateStudentBill) => TE.TaskEither<HttpErrorResponse, BillSchema>
