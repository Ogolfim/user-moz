import * as t from 'io-ts'
import { EmailCodec } from '../Email'
import { PasswordCodec } from '../Password'

export const UserLoggerByPasswordPropsCodec = t.type({
  email: EmailCodec,
  password: PasswordCodec
})

export type UserLoggerByPasswordProps = t.TypeOf<typeof UserLoggerByPasswordPropsCodec>
