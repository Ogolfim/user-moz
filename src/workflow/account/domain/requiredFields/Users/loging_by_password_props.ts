import * as t from 'io-ts'
import { EmailCodec } from '@account/domain/requiredFields/email'
import { PasswordCodec } from '@account/domain/requiredFields/password'

export const UserLoggerByPasswordPropsCodec = t.type({
  email: EmailCodec,
  password: PasswordCodec
})

export type UserLoggerByPasswordProps = t.TypeOf<typeof UserLoggerByPasswordPropsCodec>
