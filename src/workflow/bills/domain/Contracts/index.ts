import * as E from 'fp-ts/lib/Either'
import { ValidationError } from '@bills/services/validate/errors/validation_error'
import { ICreateBillProps } from '@bills/domain/requiredFields/Bills/create_Bill'
import { BillSchema, PaymentSchema } from '@account/infra/prisma/schemas'
import { PaymentStatus } from 'user-moz'
import { BillPeriod } from '@bills/domain/requiredFields/bill_period'

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
  totalAmountToPay: number
}

interface IBillPeriodDiscount {
  servicesCost: number
  billPeriod: BillPeriod
  totalAmountToPay: number
}

interface IAccountTypeDiscount {
  servicesCost: number
  accountType: BillPeriod
  totalAmountToPay: number
  employeesNumber: number
}

export type ICreataBillValidator = (data: UnValidatedBill) => E.Either<ValidationError, ICreateBillProps>

export type CreatePaymentDB = (bill: ICreatePaymentDB) => Promise<PaymentSchema>

export type CreateServicesNumberDiscount = (bill: IServicesNumberDiscount) => IServicesNumberDiscount
export type CreateBillPeriodDiscount = (bill: IBillPeriodDiscount) => IBillPeriodDiscount
export type CreateAccountTypeDiscount = (bill: IAccountTypeDiscount) => IAccountTypeDiscount

export type CreateBillService = (data: ICreateBillProps) => BillSchema
