import * as t from 'io-ts'
import { TagIdCodec } from './TagId'
import { TagTitleCodec } from './TagTitle'

export const TagCodec = t.type({
  id: TagIdCodec,
  title: TagTitleCodec
})

export type Tag = t.TypeOf<typeof TagCodec>
