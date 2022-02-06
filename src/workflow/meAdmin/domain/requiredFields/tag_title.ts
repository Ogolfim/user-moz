import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isTagTitle } from './is/is_tag_title'

type TagTitleBrand = {
  readonly TagTitle: unique symbol
}

export const TagTitleCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, TagTitleBrand> => isTagTitle(value),
    'TagTitle'
  ),
  () => 'Title do tag'
)

const IntersectTagTitle = t.intersection([t.string, TagTitleCodec])

export type TagTitle = t.TypeOf<typeof IntersectTagTitle>
