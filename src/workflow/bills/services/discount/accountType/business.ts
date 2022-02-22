export const businessDiscount = (employeesNumber: number) => (servicesCost: number): number => {
  const businessDiscountPercentage = Number(process.env.COMPANY_DISCOUNT)

  if (employeesNumber >= 2) {
    return servicesCost * businessDiscountPercentage / 100
  }

  return 0
}
