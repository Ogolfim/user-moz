import * as t from 'io-ts'

import { EmailCodec } from './Email'
import { PasswordCodec } from './Password'


export const UserCodec = t.type({
  email: EmailCodec,
  password: PasswordCodec
})


export type User = t.TypeOf<typeof UserCodec>