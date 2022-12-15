import { otherDiscountCalculator } from '@bill/services/invoice/discount/other-discount'
import { periodDiscountCalculator } from '@bill/services/invoice/discount/period-discount'
import { Discount, Period } from 'bill'

interface Props {
  subTotal: number
  discount: Discount
  period: Period
}

export const discountCalculator = ({ subTotal, discount, period }: Props) => {
  const periodDiscount = periodDiscountCalculator({ subTotal, discount, period })
  const otherDiscount = otherDiscountCalculator({ subTotal, discount })

  return periodDiscount + otherDiscount
}
