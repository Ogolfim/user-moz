import { findPricingByIdDB } from '@bill/domain/entities/find-pricing-by-id'
import { getInvoiceDB } from '@bill/domain/entities/get-invoice'
import { invoicePaymentService } from '@bill/services/invoice-payment'
import { invoicePaymentPropsValidator } from '@bill/services/validate/invoice-payment'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { updateUserDB } from '@user/domain/entities/update-user'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const invoicePaymentUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId, name, phoneNumber, address, billId, invoiceCode, paymentMethodId } = httpBody

  const data = { userId, name, phoneNumber, address, billId, invoiceCode, paymentMethodId }

  const httpResponse = pipe(
    data,
    invoicePaymentPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      invoicePaymentService(getInvoiceDB)(updateUserDB)(findPricingByIdDB),
      TE.map(result => {
        return ok(result)
      })
    ))
  )

  return httpResponse
}
