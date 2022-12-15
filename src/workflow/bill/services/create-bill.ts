import { CreateBillService } from '@bill/domain/Contracts/CreateBill'
import { createEnvices } from '@bill/services/invoice/create-invoices'
import { DatabaseFailError, EntityNotFoundError } from '@core/domain/errors/domain_error'
import { clientError, fail, notFound } from '@core/infra/middleware/http_error_response'
import { Id } from '@user/domain/requiredFields/id'
import { Period, PreBill } from 'bill'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillService: CreateBillService = (createBillDB) => (createInvoiceIdDB) => (getPricingDB) => (findUserByIdDB) => (data) => {
  const { userId, pricingId, period, teamMemberLimit } = data

  return pipe(
    TE.tryCatch(
      async () => {
        const pricing = await getPricingDB({ pricingId, locale: 'pt' })
        const user = await findUserByIdDB({ id: userId as unknown as Id })

        if (!pricing) {
          throw new EntityNotFoundError()
        }

        return { pricing, user }
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ),
    TE.chain(({ pricing, user }) => pipe(
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

          return { bill, user, invoice, pricing }
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
    TE.chain(({ bill, user, invoice, pricing }) => TE.tryCatch(
      async () => {
        await createBillDB(bill)

        return { invoice, user, pricing }
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
