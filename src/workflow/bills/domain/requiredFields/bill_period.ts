import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isBillPeriod } from '@bills/domain/requiredFields/is/is_bill_period'

type BillPeriodBrand = {
  readonly BillPeriod: unique symbol
}

export const BillPeriodCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, BillPeriodBrand> => isBillPeriod(value),
    'BillPeriod'
  ),
  () => 'Período de faturação'
)

const IntersectBillPeriod = t.intersection([t.string, BillPeriodCodec])

export type BillPeriod = t.TypeOf<typeof IntersectBillPeriod>
