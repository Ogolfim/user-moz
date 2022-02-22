export const monthlyDiscount = (servicesCost: number): number => {
  const monthlyDiscountPercentage = Number(process.env.MONTHLY_PAYMENT_DISCOUNT)

  return servicesCost * monthlyDiscountPercentage / 100
}
