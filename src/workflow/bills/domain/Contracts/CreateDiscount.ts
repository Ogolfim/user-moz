import * as TE from 'fp-ts/lib/TaskEither'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { CreateAccountTypeDiscount, CreateBillPeriodDiscount, CreateServicesNumberDiscount } from '@bills/domain/Contracts'
import { ICreateBillProps } from '@bills/domain/requiredFields/Bills/create_Bill'

interface ICreateDiscount extends ICreateBillProps {
  servicesCost: number
}

export type CreateDiscount = (servicesNumberDiscount: CreateServicesNumberDiscount) =>
(billPeriodDiscount: CreateBillPeriodDiscount) => (accountTypeDiscount: CreateAccountTypeDiscount)
=> (data: ICreateDiscount) => TE.TaskEither<HttpErrorResponse, number>
