import { Discount, Period } from 'bill'

interface Props {
  subTotal: number
  discount: Discount
  period: Period
}

export const periodDiscountCalculator = ({ subTotal, discount, period }: Props) => {
  const periodDiscount = discount.period.find(({ id }) => id === period)

  if (!periodDiscount) {
    return 0
  }

  const { percentage } = periodDiscount

  return subTotal * percentage / 100
}
