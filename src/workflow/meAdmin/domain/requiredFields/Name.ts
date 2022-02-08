import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isName } from '@meAdmin/domain/requiredFields/is/is_name'

type NameBrand = {
  readonly Name: unique symbol
}

export const NameCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, NameBrand> => isName(value),
    'Name'
  ),
  () => 'Nome'
)

const IntersectName = t.intersection([t.string, NameCodec])

export type Name = t.TypeOf<typeof IntersectName>
