import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { UserServices } from '@account/domain/contracts/Bill/UserService'
import { paymentStatus, services } from '@account/domain/entities/bill/db'
import { PaymentSchema } from '@account/infra/prisma/schemas'

export const userServices: UserServices = (bill) => {
  const { services: userServices, payment } = bill

  return pipe(
    payment,
    inicializeUserService,
    E.map(userService => {
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

function inicializeUserService (payment: PaymentSchema) {
  return E.tryCatch(
    () => {
      if (payment.paymentStatus === paymentStatus.payed) {
        throw new Error('Not Payed')
      }

      return {
        api: false,
        webDownload: false
      }
    },
    E.toError
  )
}
