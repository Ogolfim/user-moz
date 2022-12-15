import { teamTotalCalculator } from '@bill/services/invoice/sub-total/team-total'
import { Period } from 'bill'

interface Props {
  price: number
  teamMemberLimit: number
  teamMemberBaseLimit: number
  period: Period
}

export const subTotalCalculator = ({ price, teamMemberLimit, teamMemberBaseLimit, period }: Props) => {
  const teamTotal = teamTotalCalculator({ price, teamMemberBaseLimit, teamMemberLimit })

  if (period === 'month') {
    return teamTotal * 1
  }

  return teamTotal * 12
}
