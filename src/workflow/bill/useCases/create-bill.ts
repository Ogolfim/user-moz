import { createBillDB } from '@bill/domain/entities/create-bill'
import { createInvoiceIdDB } from '@bill/domain/entities/create-invoice-id'
import { findPricingByIdDB } from '@bill/domain/entities/find-pricing-by-id'
import { createBillService } from '@bill/services/create-bill'
import { createBillPropsValidator } from '@bill/services/validate/create-bill'
import { clientError, fail } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { sendInvoicesToMe } from '@core/services/email/invoice/invoices-created-to-me'
import { sendInvoicesToUser } from '@core/services/email/invoice/invoices-created-to-user'
import { findUserByIdDB } from '@user/domain/entities/find-user-by-id'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId, teamMemberLimit, period, pricingId } = httpBody

  const data = { userId, teamMemberLimit, period, pricingId }

  const httpResponse = pipe(
    data,
    createBillPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      createBillService(createBillDB)(createInvoiceIdDB)(findPricingByIdDB)(findUserByIdDB),
      TE.chain(({ invoice, pricing, user }) => TE.tryCatch(
        async () => {
          await sendInvoicesToUser({ invoice, pricing, user })
          await sendInvoicesToMe({ invoice, pricing, user })

          return invoice
        },
        err => {
          console.log(err)
          return fail(new Error('Could not sand email to the user'))
        })),
      TE.map(result => {
        return ok(result)
      })
    ))
  )

  return httpResponse
}
