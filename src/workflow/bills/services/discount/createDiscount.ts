import { CreateDiscount } from '@bills/domain/Contracts/CreateDiscount'
import { pipe } from 'fp-ts/lib/function'
import { findUserByIdService } from '@bills/services/bill/find_user_by_id'
import { countEmployeesService } from '@bills/services/bill/business/count_employees'

export const createDiscount: CreateDiscount = (servicesNumberDiscount) =>
  (billPeriodDiscount) => (accountTypeDiscount) => (data) => {
    const { services, billPeriod, userId, servicesCost } = data

    const initialBill = {
      servicesCost,
      services,
      discount: 0
    }

    return pipe(
      initialBill,
      servicesNumberDiscount,
      (discount) => {
        const periodBill = {
          servicesCost,
          billPeriod,
          discount
        }

        return billPeriodDiscount(periodBill)
      },
      (discount) => {
        const accountTypeBill = {
          servicesCost,
          userId,
          discount
        }

        return accountTypeDiscount(findUserByIdService)(countEmployeesService)(accountTypeBill)
      }
    )
  }
