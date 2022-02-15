import * as t from 'io-ts'
import { EmailCodec } from '@account/domain/requiredFields/email'
import { PasswordCodec } from '@account/domain/requiredFields/password'

export const LoginUserPropsCodec = t.type({
  email: EmailCodec,
  password: PasswordCodec
})

export type LoginUserProps = t.TypeOf<typeof LoginUserPropsCodec>
