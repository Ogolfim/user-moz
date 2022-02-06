import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isTagId } from './is/is_tag_id'

type TagIdBrand = {
  readonly TagId: unique symbol
}

export const TagIdCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, TagIdBrand> => isTagId(value),
    'TagId'
  ),
  () => 'Id do tag'
)

const IntersectTagId = t.intersection([t.string, TagIdCodec])

export type TagId = t.TypeOf<typeof IntersectTagId>
