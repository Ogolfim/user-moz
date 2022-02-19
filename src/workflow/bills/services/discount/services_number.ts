import { CreateServicesNumberDiscount } from '@bills/domain/Contracts'

export const createServicesNumberDiscount: CreateServicesNumberDiscount = (bill) => {
  const { servicesCost, services, totalAmountToPay } = bill

  const discountPercentage = Number(process.env.DISCOUNT_ON_NUMBER_OF_SERVICES)
  const servicersNumber = services.length

  const discount = servicesCost * discountPercentage / 100 * (servicersNumber - 1)

  const billDiscounted = {
    ...bill,
    totalAmountToPay: totalAmountToPay - discount
  }

  return billDiscounted
}
