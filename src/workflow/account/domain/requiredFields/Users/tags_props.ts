import * as t from 'io-ts'
import { UUID } from 'io-ts-types'

import { TagCodec } from '@account/domain/requiredFields/tag'

export const TagsPropsCodec = t.type({
  userId: UUID,
  tags: t.array(TagCodec)
})

export type TagsProps = t.TypeOf<typeof TagsPropsCodec>
