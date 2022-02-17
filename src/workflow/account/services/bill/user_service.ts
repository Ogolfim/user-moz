import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { UserServices } from '@account/domain/contracts/Bill/UserService'
import { paymentStatus, services } from '@account/domain/entities/db'
import { BillSchema, PaymentSchema } from '@account/infra/prisma/schemas'

export const userServices: UserServices = (bill) => {
  return pipe(
    bill,
    inicializeUserService,
    E.map(userService => {
      const userServices = bill.services as string[]

      for (const service of userServices) {
        if (userServices[service] === services.api) {
          userService = { ...userService, api: true }
        }

        if (userServices[service] === services.webDownload) {
          userService = { ...userService, webDownload: true }
        }
      }

      return userService
    }),
    E.fold(
      (_notPayedErr) => ({ api: false, webDownload: false }),
      userService => userService
    )

  )
}

interface Bill extends BillSchema {
  payment: PaymentSchema
}

function inicializeUserService (bill: Bill | undefined) {
  return E.tryCatch(
    () => {
      if (
        bill && bill.payment.paymentStatus === paymentStatus.payed
      ) {
        return {
          api: false,
          webDownload: false
        }
      }

      throw new Error('Not Payed')
    },
    E.toError
  )
}
