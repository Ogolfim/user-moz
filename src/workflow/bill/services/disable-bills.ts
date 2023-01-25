import { DisableBillsService } from '@bill/domain/Contracts/DisableBills'
import { isDueDate } from '@bill/services/utils/is-due-date'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { Bill } from 'bill'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const disableBillsService: DisableBillsService = (updateBillDB) => (deleteReservedEventDateByBillIdDB) => (findActiveBillsDB) => {
  return pipe(
    TE.tryCatch(
      async () => await findActiveBillsDB(),
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ),
    TE.chain(bills => TE.tryCatch(
      async () => {
        const newBills: Bill[] = []

        for (const bill of bills) {
          const { id, invoices, nextPayDate } = bill
          const passedEvent = isDueDate({ dueAt: nextPayDate })

          let failedInvoices = true

          for (const invoice of invoices) {
            const { status } = invoice

            if (status !== 'FAILED') {
              failedInvoices = false
            }
          }

          if (passedEvent || failedInvoices) {
            newBills.push({
              ...bill,
              status: 'DISABLED'
            })
          }

          if (failedInvoices) {
            await deleteReservedEventDateByBillIdDB({ billId: id })
          }
        }

        for (const updatedBill of newBills) {
          await updateBillDB(updatedBill)
        }
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ))
  )
}
