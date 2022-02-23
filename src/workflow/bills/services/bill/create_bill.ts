import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { CreateBillService } from '@bills/domain/Contracts'
import { createDiscount } from '@bills/services/discount/createDiscount'
import { createServicesNumberDiscount } from '@bills/services//discount/servicesNumber'
import { createBillPeriodDiscount } from '@bills/services/discount/billPeriod'
import { createAccountTypeDiscount } from '@bills/services/discount/accountType'
import { servicesCost } from '@bills/services/bill/servicesCost/services_cost'

export const createBillService: CreateBillService = (data) => {
  const { services, billPeriod } = data

  const cost = servicesCost(services)(billPeriod)

  const ICreateDiscount = {
    ...data,
    servicesCost: cost
  }

  return pipe(
    ICreateDiscount,
    createDiscount(createServicesNumberDiscount)(createBillPeriodDiscount)(createAccountTypeDiscount),
    TE.map(discount => cost - discount)
  )
}
