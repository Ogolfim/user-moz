import { billPeriods } from '@bills/domain/entities/db'
import { BillPeriod } from '@bills/domain/requiredFields/bill_period'
import dayjs from 'dayjs'

export const createNextBillableDay = (billPeriod: BillPeriod): Date => {
  const { weekly, monthly, biannual, yearly } = billPeriods

  const week = new Date(dayjs().add(7, 'day').format())
  const OneMonth = new Date(dayjs().add(1, 'month').format())
  const SixMonth = new Date(dayjs().add(6, 'months').format())
  const year = new Date(dayjs().add(1, 'year').format())

  const billableDay = new Map()
  billableDay.set(weekly, week)
  billableDay.set(monthly, OneMonth)
  billableDay.set(biannual, SixMonth)
  billableDay.set(yearly, year)

  const nextBillableDay: Date = billableDay.get(billPeriod)

  return nextBillableDay
}
