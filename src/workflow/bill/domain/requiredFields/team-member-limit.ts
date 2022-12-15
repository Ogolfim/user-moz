import { isTeamMemberLimit } from '@bill/domain/requiredFields/is/is-team-member-limit'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type TeamMemberLimitBrand = {
  readonly TeamMemberLimit: unique symbol
}

export const TeamMemberLimitCodec = withMessage(
  t.brand(
    t.number,
    (value): value is t.Branded<number, TeamMemberLimitBrand> => isTeamMemberLimit(value),
    'TeamMemberLimit'
  ),
  () => 'TeamMemberLimit'
)

const IntersectTeamMemberLimit = t.intersection([t.number, TeamMemberLimitCodec])

export type TeamMemberLimit = t.TypeOf<typeof IntersectTeamMemberLimit>
