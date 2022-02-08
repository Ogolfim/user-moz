import * as t from 'io-ts'
import { TagIdCodec } from '@account/domain/requiredFields/tag_id'
import { TagTitleCodec } from '@account/domain/requiredFields/tag_title'

export const TagCodec = t.type({
  id: TagIdCodec,
  title: TagTitleCodec
})

export type Tag = t.TypeOf<typeof TagCodec>
