export const discountOnServices = (servicersNumber: number) => (servicesCost: number): number => {
  const discountPercentage = Number(process.env.DISCOUNT_ON_NUMBER_OF_SERVICES)

  return servicesCost * discountPercentage / 100 * (servicersNumber - 1)
}
