import * as t from 'io-ts'
import { EmailCodec } from '../email'
import { PasswordCodec } from '../password'

export const UserLoggerByPasswordPropsCodec = t.type({
  email: EmailCodec,
  password: PasswordCodec
})

export type UserLoggerByPasswordProps = t.TypeOf<typeof UserLoggerByPasswordPropsCodec>
