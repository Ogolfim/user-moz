import { billPeriods } from '@bills/domain/entities/db'

export const isBillPeriod = (value: string) => {
  const { weekly, monthly, biannual, yearly } = billPeriods

  if (value === weekly ||
      value === monthly ||
      value === biannual ||
      value === yearly
  ) {
    return true
  }

  return false
}
