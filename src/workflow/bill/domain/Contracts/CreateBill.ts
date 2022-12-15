import { CreateInvoiceNumberDB } from '@bill/domain/Contracts/CreateInvoiceNumber'
import { FindPricingByIdDB } from '@bill/domain/Contracts/FindPricingById'
import { CreateBillProps } from '@bill/domain/requiredFields/create-bill'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { FindUserByIdDB } from '@user/domain/Contracts/FindUserById'
import { Bill, Invoice, Period, PreBill, Pricing } from 'bill'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { User } from 'mozeconomia'

interface Data {
  userId: string
  teamMemberLimit: number
  period: Period
  pricingId: string
}

export type CreateBillPropsValidator = (data: Data) => E.Either<ValidationError, CreateBillProps>

export type CreateBillDB = (data: PreBill) => Promise<Bill>

export type CreateBillService = (db: CreateBillDB) => (db: CreateInvoiceNumberDB) =>(db: FindPricingByIdDB)
=> (db: FindUserByIdDB) => (data: CreateBillProps) => TE.TaskEither<HttpErrorResponse, { invoice: Invoice, pricing: Pricing, user: User }>
