import { billPeriods } from '@bills/domain/entities/db'
import { BillPeriod } from '@bills/domain/requiredFields/bill_period'
import dayjs from 'dayjs'

export const createNextBillableDay = (billPeriod: BillPeriod): Date => {
  const { weekly, monthly, biannual, yearly } = billPeriods

  const day = dayjs.utc()

  const nextBillableDay = new Map<string, Date>()
  nextBillableDay.set(weekly, week)
  nextBillableDay.set(monthly, OneMonth)
  nextBillableDay.set(biannual, SixMonth)
  nextBillableDay.set(yearly, year)

  return nextBillableDay.get(billPeriod)
}
