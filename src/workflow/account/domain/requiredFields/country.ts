import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isCountry } from '@bills/domain/requiredFields/is/is_country'

type CountryBrand = {
  readonly Country: unique symbol
}

export const CountryCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, CountryBrand> => isCountry(value),
    'Country'
  ),
  () => 'País'
)

const IntersectCountry = t.intersection([t.string, CountryCodec])

export type Country = t.TypeOf<typeof IntersectCountry>
