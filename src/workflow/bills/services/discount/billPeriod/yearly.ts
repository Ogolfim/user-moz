export const yearlyDiscount = (servicesCost: number): number => {
  const yearlyDiscountPercentage = Number(process.env.YEAR_PAYMENT_DISCOUNT)

  return servicesCost * yearlyDiscountPercentage / 100
}
