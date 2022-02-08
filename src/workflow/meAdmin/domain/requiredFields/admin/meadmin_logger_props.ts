import * as t from 'io-ts'
import { EmailCodec } from '@meAdmin/domain/requiredFields/email'
import { PasswordCodec } from '@meAdmin/domain/requiredFields/password'

export const MeAdminLoggerPropsCodec = t.type({
  email: EmailCodec,
  password: PasswordCodec
})

export type MeAdminLoggerProps = t.TypeOf<typeof MeAdminLoggerPropsCodec>
