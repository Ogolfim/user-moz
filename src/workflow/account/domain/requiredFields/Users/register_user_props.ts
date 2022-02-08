import * as t from 'io-ts'
import { EmailCodec } from '@account/domain/requiredFields/email'
import { NameCodec } from '@account/domain/requiredFields/name'
import { PasswordCodec } from '@account/domain/requiredFields/password'

export const UserRegisterPropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  password: PasswordCodec
})

export type UserRegisterProps = t.TypeOf<typeof UserRegisterPropsCodec>
