import { InvoicePaymentService } from '@bill/domain/Contracts/InvoicePayment'
import { Id as PricingId } from '@bill/domain/requiredFields/id'
import { getPaymentMethod } from '@bill/domain/requiredFields/is/is-payment-method'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { sendInvoicesToUser } from '@core/services/email/invoice/invoices-created-to-user'
import { Id } from '@user/domain/requiredFields/id'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const invoicePaymentService: InvoicePaymentService = (getInvoiceDB) => (updateUserDB) => (findPricingByIdDB) => (data) => {
  const { userId, billId, invoiceCode, name, phoneNumber, address, paymentMethodId } = data

  return pipe(
    TE.tryCatch(
      async () => {
        const paymentMethod = getPaymentMethod(paymentMethodId)

        const invoice = await getInvoiceDB({ billId, invoiceCode, userId })
        const { pricingId } = invoice

        const pricing = await findPricingByIdDB({
          pricingId: pricingId as PricingId,
          locale: 'pt'
        })

        const user = await updateUserDB({
          userId: userId as unknown as Id,
          name,
          phoneNumber,
          address,
          image: undefined
        })

        return { invoice, user, pricing, paymentMethod }
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ),
    TE.chain(({ invoice, pricing, user, paymentMethod }) => TE.tryCatch(
      async () => {
        await sendInvoicesToUser({ invoice, pricing, user, paymentMethod })

        return invoice
      },
      err => {
        console.log(err)
        return fail(new Error('Could not sand email to the user'))
      }))
  )
}
