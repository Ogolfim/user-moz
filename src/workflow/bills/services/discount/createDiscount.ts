import { CreateDiscount } from '@bills/domain/Contracts/CreateDiscount'
import { pipe } from 'fp-ts/lib/function'

export const createDiscount: CreateDiscount = (servicesNumberDiscount) =>
  (billPeriodDiscount) => (accountTypeDiscount) => (data) => {
    const { services, billPeriod, userId, servicesCost, accountType } = data

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
        const IAccountType = {
          servicesCost,
          userId,
          discount,
          accountType
        }

        return pipe(
          IAccountType,
          accountTypeDiscount
        )
      }
    )
  }
