import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isTagId } from './is/isTagId'

type TagIdBrand = {
  readonly TagId: unique symbol
}

export const TagIdCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, TagIdBrand> => isTagId(value),
    'TagId'
  ),
  () => 'Ops! Id do tag invalido'
)

const IntersectTagId = t.intersection([t.string, TagIdCodec])

export type TagId = t.TypeOf<typeof IntersectTagId>
