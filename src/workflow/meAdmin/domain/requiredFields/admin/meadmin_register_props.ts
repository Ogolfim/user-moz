import * as t from 'io-ts'
import { EmailCodec } from '@meAdmin/domain/requiredFields/email'
import { NameCodec } from '@meAdmin/domain/requiredFields/name'
import { PasswordCodec } from '@meAdmin/domain/requiredFields/password'

export const MeAdminRegisterPropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  password: PasswordCodec
})

export type MeAdminRegisterProps = t.TypeOf<typeof MeAdminRegisterPropsCodec>
