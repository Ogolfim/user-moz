import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isPostcode } from '@bills/domain/requiredFields/is/is_postcode'

type PostcodeBrand = {
  readonly Postcode: unique symbol
}

export const PostcodeCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PostcodeBrand> => isPostcode(value),
    'Postcode'
  ),
  () => 'Código postal'
)

const IntersectPostcode = t.intersection([t.string, PostcodeCodec])

export type Postcode = t.TypeOf<typeof IntersectPostcode>
