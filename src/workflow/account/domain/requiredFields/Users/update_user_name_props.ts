import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { NameCodec } from '@account/domain/requiredFields/name'

export const UpdateUserNamePropsCodec = t.type({
  userId: UUID,
  name: NameCodec
})

export type UpdateUserNameProps = t.TypeOf<typeof UpdateUserNamePropsCodec>
