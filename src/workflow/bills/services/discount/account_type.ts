import { accountTypes } from '@account/domain/entities/db'
import { CreateAccountTypeDiscount } from '@bills/domain/Contracts'

export const createServicesNumberDiscount: CreateAccountTypeDiscount = (bill) => {
  const { servicesCost, accountType, totalAmountToPay, employeesNumber } = bill

  const unipersonalDiscountPercentage = Number(process.env.DISCOUNT_ON_NUMBER_OF_SERVICES)
  const studentDiscountPercentage = Number(process.env.DISCOUNT_ON_NUMBER_OF_SERVICES)
  const businessDiscountPercentage = Number(process.env.DISCOUNT_ON_NUMBER_OF_SERVICES)

  const billDiscounted = (discount: number) => {
    return {
      servicesCost,
      totalAmountToPay: totalAmountToPay - discount,
      accountType,
      employeesNumber
    }
  }

  if (accountType === accountTypes.unipersonal) {
    const discount = servicesCost * unipersonalDiscountPercentage / 100
    return billDiscounted(discount)
  }

  if (accountType === accountTypes.student) {
    const discount = servicesCost * studentDiscountPercentage / 100
    return billDiscounted(discount)
  }

  if (accountType === accountTypes.business) {
    if (employeesNumber >= 2) {
      const discount = servicesCost * businessDiscountPercentage / 100
      return billDiscounted(discount)
    }

    return billDiscounted(0)
  }
}
