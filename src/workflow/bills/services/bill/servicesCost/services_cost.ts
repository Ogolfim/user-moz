import { billPeriods, services as s } from '@bills/domain/entities/db'
import { BillPeriod } from '@bills/domain/requiredFields/bill_period'

export const servicesCost = (services: string[]) => (billPeriod: BillPeriod): number => {
  const { weekly, monthly, biannual, yearly } = billPeriods
  const downloadCost = Number(process.env.DOWNLOAD_COST)
  const apiCost = Number(process.env.API_COST)

  let initialCost = 0

  for (const service of services) {
    if (service === s.api) {
      initialCost = initialCost + apiCost
    }

    if (service === s.webDownload) {
      initialCost = initialCost + downloadCost
    }
  }

  const cost = new Map<string, number>()
  cost.set(weekly, initialCost / 4)
  cost.set(monthly, initialCost)
  cost.set(biannual, initialCost * 6)
  cost.set(yearly, initialCost * 12)

  return cost.get(billPeriod)
}
