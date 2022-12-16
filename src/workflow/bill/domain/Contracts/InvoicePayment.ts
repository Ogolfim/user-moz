import { FindPricingByIdDB } from '@bill/domain/Contracts/FindPricingById'
import { GetInvoiceDB } from '@bill/domain/Contracts/GetInvoice'
import { InvoicePaymentProps } from '@bill/domain/requiredFields/invoice-payment'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { UpdateUserDB } from '@user/domain/Contracts/UpdateUser'
import { Invoice } from 'bill'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { Address } from 'mozeconomia'

interface Data {
  userId: string
  name: string
  phoneNumber: string
  address: Address
  billId: string
  invoiceCode: string
  paymentMethodId: string
}

export type InvoicePaymentPropsValidator = (data: Data) => E.Either<ValidationError, InvoicePaymentProps>

export type InvoicePaymentService = (db: GetInvoiceDB) => (db: UpdateUserDB) =>
(db: FindPricingByIdDB) => (data: InvoicePaymentProps) => TE.TaskEither<HttpErrorResponse, Invoice>
