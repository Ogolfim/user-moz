import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { ValidationError } from '@bills/services/validate/errors/validation_error'
import { ICreateBillProps } from '@bills/domain/requiredFields/Bills/create_Bill'
import { PaymentSchema } from '@core/infra/prisma/schemas'
import { PaymentStatus } from 'user-moz'
import { BillPeriod } from '@bills/domain/requiredFields/bill_period'
import { UUID } from 'io-ts-types'
import { FindUserByIdService } from '@bills/domain/Contracts/User/FindUserById'
import { CountEmployeesService } from '@bills/domain/Contracts/Business/CountEmployees'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { TaskEither } from 'fp-ts/lib/TaskEither'

interface UnValidatedBill {
  services: Array<string>
  billPeriod: string
  userId: string
}

interface ICreatePaymentDB {
  billId: number
  paymentStatus: PaymentStatus
  totalAmount: number
  paymentStartedAt: Date
  paymentDeadline: Date
}

interface IServicesNumberDiscount {
  servicesCost: number
  services: string[]
  discount: number
}

interface IBillPeriodDiscount {
  servicesCost: number
  billPeriod: BillPeriod
  discount: number
}

interface IAccountTypeDiscount {
  servicesCost: number
  discount: number,
  userId: UUID
}

export type ICreataBillValidator = (data: UnValidatedBill) => E.Either<ValidationError, ICreateBillProps>

export type CreatePaymentDB = (bill: ICreatePaymentDB) => Promise<PaymentSchema>

export type CreateServicesNumberDiscount = (bill: IServicesNumberDiscount) => number
export type CreateBillPeriodDiscount = (bill: IBillPeriodDiscount) => number
export type CreateAccountTypeDiscount = (findUserByIdService: FindUserByIdService) =>
(countEmployeesService: CountEmployeesService) => (bill: IAccountTypeDiscount) => TaskEither<HttpErrorResponse, number>

export type CreateBillService = (data: ICreateBillProps) => TE.TaskEither<HttpErrorResponse, number>
