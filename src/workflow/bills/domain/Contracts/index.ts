import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { UUID } from 'io-ts-types'
import { ValidationError } from '@bills/services/validate/errors/validation_error'
import { ICreateBillProps } from '@bills/domain/requiredFields/Bills/create_Bill'
import { BillSchema } from '@core/infra/prisma/schemas'
import { BillPeriod } from '@bills/domain/requiredFields/bill_period'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { AccountType } from '@account/domain/requiredFields/account_type'
import { Payment } from '@prisma/client'

interface UnValidatedBill {
  services: Array<string>
  billPeriod: string
  userId: string
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
  userId: UUID,
  accountType: AccountType
}

interface Bill extends BillSchema {
  payment: Payment
}

export type ICreataBillValidator = (data: UnValidatedBill) => E.Either<ValidationError, ICreateBillProps>

export type CreateServicesNumberDiscount = (bill: IServicesNumberDiscount) => number
export type CreateBillPeriodDiscount = (bill: IBillPeriodDiscount) => number

export type CountEmployeesDB = (adminId: UUID) => Promise<number>
export type CreateAccountTypeDiscount = (bill: IAccountTypeDiscount) => TaskEither<HttpErrorResponse, number>

export type createUnipersonalBillDB = () => TaskEither<HttpErrorResponse, BillSchema>
export type createStudentBillDB = () => TaskEither<HttpErrorResponse, BillSchema>

export type CreateBillService = (data: ICreateBillProps) => TE.TaskEither<HttpErrorResponse, Bill>
