import { CreateServicesNumberDiscount } from '@bills/domain/Contracts'
import { discountOnServices } from './discount'

export const createServicesNumberDiscount: CreateServicesNumberDiscount = (bill) => {
  const { servicesCost, services, totalAmountToPay } = bill

  const discount = discountOnServices(services.length)(servicesCost)

  const billDiscounted = {
    ...bill,
    totalAmountToPay: totalAmountToPay - discount
  }

  return billDiscounted
}
