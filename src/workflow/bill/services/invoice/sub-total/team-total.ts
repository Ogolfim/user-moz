interface Props {
  price: number
  teamMemberLimit: number
  teamMemberBaseLimit: number
}

export const teamTotalCalculator = ({ teamMemberBaseLimit, teamMemberLimit, price }: Props) => {
  const increasedLimit = teamMemberLimit - teamMemberBaseLimit

  if (increasedLimit === 0) {
    return price
  }

  return price * increasedLimit
}
