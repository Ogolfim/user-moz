import * as t from 'io-ts'

import { EmailCodec } from './Email'
import { PasswordCodec } from './Password'
import { NameCodec } from './Name'


export const UserCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  password: PasswordCodec
})


export type User = t.TypeOf<typeof UserCodec>