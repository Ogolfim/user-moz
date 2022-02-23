import { services } from '@bills/domain/entities/db'

export const isServiceId = (value: string) => {
  if (value === services.webDownload ||
      value === services.api
  ) {
    return true
  }

  return false
}
