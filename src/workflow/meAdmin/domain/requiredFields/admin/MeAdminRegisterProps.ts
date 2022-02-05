import * as t from 'io-ts'
import { EmailCodec } from '../Email'
import { NameCodec } from '../Name'
import { PasswordCodec } from '../Password'

export const MeAdminRegisterPropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  password: PasswordCodec
})

export type MeAdminRegisterProps = t.TypeOf<typeof MeAdminRegisterPropsCodec>
