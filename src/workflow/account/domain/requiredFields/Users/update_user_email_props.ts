import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { EmailCodec } from '../email'

export const UpdateUserEmailPropsCodec = t.type({
  email: EmailCodec,
  userId: UUID
})

export type UpdateUserEmailProps = t.TypeOf<typeof UpdateUserEmailPropsCodec>
