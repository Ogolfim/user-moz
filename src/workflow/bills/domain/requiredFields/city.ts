import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isCity } from '@bills/domain/requiredFields/is/is_city'

type CityBrand = {
  readonly City: unique symbol
}

export const CityCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, CityBrand> => isCity(value),
    'City'
  ),
  () => 'Cidade invalida'
)

const IntersectCity = t.intersection([t.string, CityCodec])

export type City = t.TypeOf<typeof IntersectCity>
