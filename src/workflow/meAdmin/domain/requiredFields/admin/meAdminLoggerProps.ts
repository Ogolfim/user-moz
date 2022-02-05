import * as t from 'io-ts'
import { EmailCodec } from '../Email'
import { PasswordCodec } from '../Password'

export const MeAdminLoggerPropsCodec = t.type({
  email: EmailCodec,
  password: PasswordCodec
})

export type MeAdminLoggerProps = t.TypeOf<typeof MeAdminLoggerPropsCodec>
