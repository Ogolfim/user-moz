import * as t from 'io-ts'
import { EmailCodec } from '../email'
import { PasswordCodec } from '../password'

export const MeAdminLoggerPropsCodec = t.type({
  email: EmailCodec,
  password: PasswordCodec
})

export type MeAdminLoggerProps = t.TypeOf<typeof MeAdminLoggerPropsCodec>
