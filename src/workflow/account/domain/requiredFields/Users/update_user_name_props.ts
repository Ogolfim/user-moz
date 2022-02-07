import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { NameCodec } from '../name'

export const UpdateUserNamePropsCodec = t.type({
  name: NameCodec,
  userId: UUID
})

export type UpdateUserNameProps = t.TypeOf<typeof UpdateUserNamePropsCodec>
