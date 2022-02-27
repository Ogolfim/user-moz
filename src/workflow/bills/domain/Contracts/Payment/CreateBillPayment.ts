import * as TE from 'fp-ts/lib/TaskEither'
import { PaymentSchema } from '@core/infra/prisma/schemas'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { Decimal, PaymentStatus } from 'user-moz'

interface ICreateBillPayment {
  paymentStatus: PaymentStatus
  amount: Decimal
  paymentDeadline: Date;
  billId: string;
}

export type CreateBillPaymentDB = (bill: ICreateBillPayment) => Promise<PaymentSchema>

export type CreateBillPaymentService = (createBillPaymentDB: CreateBillPaymentDB) =>
(bill: ICreateBillPayment) => TE.TaskEither<HttpErrorResponse, PaymentSchema>
