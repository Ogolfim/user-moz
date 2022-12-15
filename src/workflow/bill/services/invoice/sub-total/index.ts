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

  if (period === 'week') {
    return teamTotal * 1
  }

  if (period === 'month') {
    return teamTotal * 4
  }

  return (teamTotal * 4) * 12
}
