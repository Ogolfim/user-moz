import { CreateBillPeriodDiscount } from '@bills/domain/Contracts'
import { billPeriods } from '@bills/domain/entities/db'
import { biannualDiscount } from '@bills/services/discount/billPeriod/biannual'
import { monthlyDiscount } from '@bills/services/discount/billPeriod/monthly'
import { weeklyMarginalRate } from '@bills/services/discount/billPeriod/weekly'
import { yearlyDiscount } from '@bills/services/discount/billPeriod/yearly'

export const createBillPeriodDiscount: CreateBillPeriodDiscount = (bill) => {
  const { servicesCost, discount, billPeriod } = bill
  const { weekly, monthly, biannual, yearly } = billPeriods

  const newDiscount = new Map<string, number>()
  newDiscount.set(weekly, weeklyMarginalRate(servicesCost))
  newDiscount.set(monthly, monthlyDiscount(servicesCost))
  newDiscount.set(biannual, biannualDiscount(servicesCost))
  newDiscount.set(yearly, yearlyDiscount(servicesCost))

  return discount + newDiscount.get(billPeriod)
}
