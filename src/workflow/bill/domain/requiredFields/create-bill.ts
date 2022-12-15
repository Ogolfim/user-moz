import { IdCodec } from '@bill/domain/requiredFields/id'
import { PeriodCodec } from '@bill/domain/requiredFields/period'
import { TeamMemberLimitCodec } from '@bill/domain/requiredFields/team-member-limit'
import * as t from 'io-ts'

export const CreateBillPropsCodec = t.type({
  userId: IdCodec,
  teamMemberLimit: TeamMemberLimitCodec,
  pricingId: IdCodec,
  period: PeriodCodec
})

export type CreateBillProps = t.TypeOf<typeof CreateBillPropsCodec>
