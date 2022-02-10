import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isProvinceOrState } from '@bills/domain/requiredFields/is/is_Province_Or_State'

type ProvinceOrStateBrand = {
  readonly ProvinceOrState: unique symbol
}

export const ProvinceOrStateCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, ProvinceOrStateBrand> => isProvinceOrState(value),
    'ProvinceOrState'
  ),
  () => 'Província or Estado'
)

const IntersectProvinceOrState = t.intersection([t.string, ProvinceOrStateCodec])

export type ProvinceOrState = t.TypeOf<typeof IntersectProvinceOrState>
