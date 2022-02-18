import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isDate } from '@account/domain/requiredFields/is/is_date'

type DateBrand = {
  readonly Date: unique symbol
}

export const DateCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, DateBrand> => isDate(value),
    'Date'
  ),
  () => 'Província or Estado'
)

const IntersectDate = t.intersection([t.string, DateCodec])

export type Date = t.TypeOf<typeof IntersectDate>
