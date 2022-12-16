import { CreateBillService } from '@bill/domain/Contracts/CreateBill'
import { createEnvices } from '@bill/services/invoice/create-invoices'
import { DatabaseFailError, EntityNotFoundError } from '@core/domain/errors/domain_error'
import { clientError, fail, notFound } from '@core/infra/middleware/http_error_response'
import { Period, PreBill } from 'bill'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillService: CreateBillService = (createBillDB) => (createInvoiceIdDB) => (getPricingDB) => (findUserByIdDB) => (data) => {
  const { userId, pricingId, period, teamMemberLimit } = data

  return pipe(
    TE.tryCatch(
      async () => {
        const pricing = await getPricingDB({ pricingId, locale: 'pt' })

        if (!pricing) {
          throw new EntityNotFoundError()
        }

        return { pricing }
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ),
    TE.chain(({ pricing }) => pipe(
      { pricing, teamMemberLimit, period },
      createEnvices(createInvoiceIdDB),
      TE.chain(invoice => TE.tryCatch(
        async () => {
          const bill: PreBill = {
            userId,
            teamMemberLimit,
            period: period as Period,
            pricingId,
            invoices: [invoice],
            status: 'ACTIVE',
            nextPayDate: invoice.nextPayDate
          }

          return { bill, invoice }
        },
        (err: any) => {
          if (err.name === 'EntityNotFound') {
            return notFound(err)
          }

          console.log(err)
          return fail(new DatabaseFailError())
        }
      ))
    )),
    TE.chain(({ bill, invoice }) => TE.tryCatch(
      async () => {
        const newBill = await createBillDB(bill)

        return {
          billId: newBill.id,
          invoiceCode: invoice.invoiceCode
        }
      },

      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        if (err.name === 'EntityAlreadyExist') {
          return clientError(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ))
  )
}
