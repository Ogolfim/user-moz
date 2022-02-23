// Must return negative number

export const weeklyMarginalRate = (servicesCost: number): number => {
  const weeklyMarginalRatePercentage = Number(process.env.WEEKLY_MARGINAL_RATE)

  const rate = servicesCost * weeklyMarginalRatePercentage / 100

  return (-rate)
}
