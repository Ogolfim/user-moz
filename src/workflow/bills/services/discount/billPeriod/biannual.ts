export const biannualDiscount = (servicesCost: number): number => {
  const biannualDiscountPercentage = Number(process.env.BIANNUAL_PAYMENT_DISCOUNT)

  return servicesCost * biannualDiscountPercentage / 100
}
