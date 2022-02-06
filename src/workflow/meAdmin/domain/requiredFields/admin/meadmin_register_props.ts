import * as t from 'io-ts'
import { EmailCodec } from '../email'
import { NameCodec } from '../name'
import { PasswordCodec } from '../password'

export const MeAdminRegisterPropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  password: PasswordCodec
})

export type MeAdminRegisterProps = t.TypeOf<typeof MeAdminRegisterPropsCodec>
