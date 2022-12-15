import { isPeriod } from '@bill/domain/requiredFields/is/is-period'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type PeriodBrand = {
  readonly Period: unique symbol
}

export const PeriodCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PeriodBrand> => isPeriod(value),
    'Period'
  ),
  () => 'Period'
)

const IntersectPeriod = t.intersection([t.string, PeriodCodec])

export type Period = t.TypeOf<typeof IntersectPeriod>
