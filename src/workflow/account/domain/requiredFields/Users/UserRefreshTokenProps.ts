import * as t from 'io-ts'
import { UUID } from 'io-ts-types'

export const UserRefreshTokenPropsCodec = t.type({
  id: UUID,
  userId: UUID
})

export type UserRefreshTokenProps = t.TypeOf<typeof UserRefreshTokenPropsCodec>
