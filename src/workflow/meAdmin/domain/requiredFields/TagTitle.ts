import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isTagTitle } from './is/isTagTitle'

type TagTitleBrand = {
  readonly TagTitle: unique symbol
}

export const TagTitleCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, TagTitleBrand> =>  isTagTitle(value),
    'TagTitle'
  ),
  () => 'Ops! Title do tag invalido'
)

const IntersectTagTitle = t.intersection([t.string, TagTitleCodec])

export type TagTitle = t.TypeOf<typeof IntersectTagTitle>