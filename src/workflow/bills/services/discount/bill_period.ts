import { CreateBillPeriodDiscount } from '@bills/domain/Contracts'
import { billPeriods } from '@bills/domain/entities/db'

export const createBillPeriodDiscount: CreateBillPeriodDiscount = (bill) => {
  const { servicesCost, totalAmountToPay, billPeriod } = bill

  const weeklyMarginalRatePercentage = Number(process.env.WEEKLY_MARGINAL_RATE)
  const monthlyDiscountPercentage = Number(process.env.MONTHLY_PAYMENT_DISCOUNT)
  const biannualDiscountPercentage = Number(process.env.BIANNUAL_PAYMENT_DISCOUNT)
  const yearlyDiscountPercentage = Number(process.env.YEAR_PAYMENT_DISCOUNT)

  const billDiscounted = (discount: number) => {
    return {
      servicesCost,
      totalAmountToPay: totalAmountToPay - discount,
      billPeriod
    }
  }

  if (billPeriod === billPeriods.weekly) {
    const discount = servicesCost * weeklyMarginalRatePercentage / 100
    return billDiscounted(-discount)
  }

  if (billPeriod === billPeriods.monthly) {
    const discount = servicesCost * monthlyDiscountPercentage / 100
    return billDiscounted(discount)
  }

  if (billPeriod === billPeriods.biannual) {
    const discount = servicesCost * biannualDiscountPercentage / 100
    return billDiscounted(discount)
  }

  if (billPeriod === billPeriods.yearly) {
    const discount = servicesCost * yearlyDiscountPercentage / 100
    return billDiscounted(discount)
  }
}
