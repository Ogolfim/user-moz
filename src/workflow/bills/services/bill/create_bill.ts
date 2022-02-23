import { pipe } from 'fp-ts/lib/function'
import { CreateBillService } from '@bills/domain/Contracts'
import { createDiscount } from '@bills/services/discount/createDiscount'
import { createServicesNumberDiscount } from '@bills/services//discount/servicesNumber'
import { createBillPeriodDiscount } from '@bills/services/discount/billPeriod'
import { createAccountTypeDiscount } from '@bills/services/discount/accountType'

export const createBillService: CreateBillService = (data) => {
  return pipe(
    data,
    createDiscount(createServicesNumberDiscount)(createBillPeriodDiscount)(createAccountTypeDiscount)
  )
}
