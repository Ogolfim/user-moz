export const studentDiscount = (servicesCost: number): number => {
  const studentDiscountPercentage = Number(process.env.STUDENT_DISCOUNT)

  return servicesCost * studentDiscountPercentage / 100
}
