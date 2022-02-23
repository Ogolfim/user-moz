import { CreateDiscount } from '@bills/domain/Contracts/CreateDiscount'
import { pipe } from 'fp-ts/lib/function'
import { findUserByIdService } from '@bills/services/bill/find_user_by_id'
import { servicesCost } from '@bills/services/bill/servicesCost/services_cost'
import { countEmployeesService } from '@bills/services/bill/business/count_employees'

export const createDiscount: CreateDiscount = (servicesNumberDiscount) =>
  (billPeriodDiscount) => (accountTypeDiscount) => (data) => {
    const { services, billPeriod, userId } = data

    const cost = servicesCost(services)

    const initialBill = {
      servicesCost: cost,
      services,
      discount: 0
    }

    return pipe(
      initialBill,
      servicesNumberDiscount,
      (discount) => {
        const periodBill = {
          servicesCost: cost,
          billPeriod,
          discount
        }

        return billPeriodDiscount(periodBill)
      },
      (discount) => {
        const accountTypeBill = {
          servicesCost: cost,
          userId,
          discount
        }

        return accountTypeDiscount(findUserByIdService)(countEmployeesService)(accountTypeBill)
      }
    )
  }
