import { CreateInvoicesService } from '@bill/domain/Contracts/CreateInvoiceNumber'
import { totalCalculator } from '@bill/services/invoice/total'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { Invoice, Period } from 'bill'
import dayjs from 'dayjs'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createEnvices: CreateInvoicesService = (createInvoiceNumberDB) => (data) => {
  const { pricing, teamMemberLimit, period } = data

  return pipe(
    TE.tryCatch(
      async () => {
        const today = dayjs(new Date())
        const todayFormatted = today.format('YYYY-MM-DDTHH:mm:ssZ[Z]')

        const invoiceDueAt = today.add(3, 'days').format('YYYY-MM-DDTHH:mm:ssZ[Z]')
        const invoiceId = await createInvoiceNumberDB()

        const { total, subTotal, discounted, nextPayDate } = totalCalculator({ pricing, teamMemberLimit, period: period as Period })

        const invoice: Invoice = {
          invoiceCode: invoiceId.code,
          pricingId: pricing.id,
          teamMemberLimit,
          subTotal,
          discounted,
          total,
          period: period as Period,
          status: 'PENDING',
          nextPayDate,
          dueAt: invoiceDueAt,
          createdAt: todayFormatted
        }

        return invoice
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(err)
      }
    )
  )
}
