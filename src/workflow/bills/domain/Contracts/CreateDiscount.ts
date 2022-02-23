import * as TE from 'fp-ts/lib/TaskEither'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { CreateAccountTypeDiscount, CreateBillPeriodDiscount, CreateServicesNumberDiscount } from '@bills/domain/Contracts'
import { ICreateBillProps } from '@bills/domain/requiredFields/Bills/create_Bill'

export type CreateDiscount = (servicesNumberDiscount: CreateServicesNumberDiscount) =>
(billPeriodDiscount: CreateBillPeriodDiscount) => (accountTypeDiscount: CreateAccountTypeDiscount)
=> (data: ICreateBillProps) => TE.TaskEither<HttpErrorResponse, number>
