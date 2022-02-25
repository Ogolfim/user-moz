import { billPeriods } from '@bills/domain/entities/db'
import { BillPeriod } from '@bills/domain/requiredFields/bill_period'
import dayjs from 'dayjs'

export const createNextBillableDay = (billPeriod: BillPeriod): Date => {
  const { weekly, monthly, biannual, yearly } = billPeriods

  const week = dayjs().add(7, 'day')
  const OneMonth = dayjs().add(1, 'month')
  const SixMonth = dayjs().add(6, 'months')
  const year = dayjs().add(1, 'year')

  const billableDay = new Map()
  billableDay.set(weekly, week)
  billableDay.set(monthly, OneMonth)
  billableDay.set(biannual, SixMonth)
  billableDay.set(yearly, year)

  const nextBillableDay: Date = billableDay.get(billPeriod)

  return nextBillableDay
}
