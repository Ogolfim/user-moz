import { CreateBillPeriodDiscount } from '@bills/domain/Contracts'
import { billPeriods } from '@bills/domain/entities/db'
import { biannualDiscount } from './biannual'
import { monthlyDiscount } from './monthly'
import { weeklyMarginalRate } from './weekly'
import { yearlyDiscount } from './yearly'

export const createBillPeriodDiscount: CreateBillPeriodDiscount = (bill) => {
  const { servicesCost, totalAmountToPay, billPeriod } = bill
  const { weekly, monthly, biannual, yearly } = billPeriods

  const discount = new Map<string, number>()
  discount.set(weekly, weeklyMarginalRate(servicesCost))
  discount.set(monthly, monthlyDiscount(servicesCost))
  discount.set(biannual, biannualDiscount(servicesCost))
  discount.set(yearly, yearlyDiscount(servicesCost))

  const billDiscounted = {
    ...bill,
    totalAmountToPay: totalAmountToPay - discount.get(billPeriod)
  }

  return billDiscounted
}
