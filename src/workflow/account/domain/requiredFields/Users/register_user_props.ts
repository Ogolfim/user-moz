import * as t from 'io-ts'
import { EmailCodec } from '@account/domain/requiredFields/email'
import { NameCodec } from '@account/domain/requiredFields/name'
import { PasswordCodec } from '@account/domain/requiredFields/password'
import { AccountTypeCodec } from '@account/domain/requiredFields/account_type'

export const CreateUserPropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  password: PasswordCodec,
  accountType: AccountTypeCodec
})

export type CreateUserProps = t.TypeOf<typeof CreateUserPropsCodec>
