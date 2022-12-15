import { discountCalculator } from '@bill/services/invoice/discount'
import { getNextPayDate } from '@bill/services/invoice/next-pay-date'
import { subTotalCalculator } from '@bill/services/invoice/sub-total'
import { Period, Pricing } from 'bill'

interface Props {
  pricing: Pricing
  teamMemberLimit: number
  period: Period
}

export const totalCalculator = ({ pricing, teamMemberLimit, period }: Props) => {
  const { price, teamMemberBaseLimit, discount } = pricing

  const subTotal = subTotalCalculator({ price, teamMemberBaseLimit, teamMemberLimit, period })

  const discounted = discountCalculator({ subTotal, period, discount })

  const nextPayDate = getNextPayDate({ period })

  const total = subTotal - discounted

  return {
    subTotal,
    total,
    discounted,
    nextPayDate
  }
}
