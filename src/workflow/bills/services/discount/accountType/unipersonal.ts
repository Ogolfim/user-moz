export const unipersonalDiscount = (servicesCost: number): number => {
  const unipersonalDiscountPercentage = Number(process.env.UNIPERSONAL_DISCOUNT)

  return servicesCost * unipersonalDiscountPercentage / 100
}
