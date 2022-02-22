import * as TE from 'fp-ts/lib/TaskEither'
import { CreateBillService } from '@bills/domain/Contracts'
import { pipe } from 'fp-ts/lib/function'
import { findUserByIdService } from '@bills/services/bill/find_user_by_id'
import { findUserByIdDB } from '@bills/domain/entities/user/find_user_by_id'
import { accountTypes } from '@account/domain/entities/db'
import { servicesCost } from '@bills/services/bill/servicesCost/services_cost'

export const createBillService: CreateBillService =
(servicesNumberDiscount) => (billPeriodDiscount) => (accountTypeDiscount) => (data) => {
  const { services, billPeriod, userId } = data

  const cost = servicesCost(services)

  pipe(
    userId,
    findUserByIdService(findUserByIdDB),
    TE.chain(user => {
      const { accountType } = user

      const bill = {
        servicesCost,
        accountType,
        totalAmountToPay: cost
      }

      if (accountType === accountTypes.business) {

        employeesNumber

        return { ...bill, employeesNumber }
      }

      return bill
    })
  )

  const servicesNumberD = servicesNumberDiscount()
  const billPeriodD = billPeriodDiscount()
  const accountTypeD = accountTypeDiscount()

  // const bill = {
  //   services,
  //   totalAmountToPay,
  //   nextBillableDay,
  //   note
  // }
}
