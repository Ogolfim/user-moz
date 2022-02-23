import { services as s } from '@bills/domain/entities/db'

export const servicesCost = (services: string[]): number => {
  const downloadCost = Number(process.env.DOWNLOAD_COST)
  const apiCost = Number(process.env.API_COST)

  let cost = 0

  for (const service of services) {
    if (service === s.api) {
      cost = cost + apiCost
    }

    if (service === s.webDownload) {
      cost = cost + downloadCost
    }
  }

  return cost
}
