export const isBillPeriod = (value: string) => {
  if (value === 'WEEKLY' ||
      value === 'MONTHLY' ||
      value === 'YEARLY'
  ) {
    return true
  }

  return false
}
