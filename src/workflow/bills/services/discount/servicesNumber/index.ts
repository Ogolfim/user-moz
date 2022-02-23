import { CreateServicesNumberDiscount } from '@bills/domain/Contracts'
import { discountOnServices } from '@bills/services/discount/servicesNumber/discount'

export const createServicesNumberDiscount: CreateServicesNumberDiscount = (bill) => {
  const { servicesCost, services, discount } = bill

  const newDiscount = discountOnServices(services.length)(servicesCost)

  return discount + newDiscount
}
