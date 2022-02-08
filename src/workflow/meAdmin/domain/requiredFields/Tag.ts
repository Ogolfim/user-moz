import * as t from 'io-ts'
import { TagIdCodec } from './tag_id'
import { TagTitleCodec } from '@meAdmin/domain/requiredFields/tag_title'

export const TagCodec = t.type({
  id: TagIdCodec,
  title: TagTitleCodec
})

export type Tag = t.TypeOf<typeof TagCodec>
