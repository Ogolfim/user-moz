import { EmailCodec } from '@user/domain/requiredFields/email'
import { MessageCodec } from '@user/domain/requiredFields/message'
import { NameCodec } from '@user/domain/requiredFields/name'
import { PhoneNumberCodec } from '@user/domain/requiredFields/phone-number'
import * as t from 'io-ts'

export const UserSupportPropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  phoneNumber: PhoneNumberCodec,
  service: NameCodec,
  message: MessageCodec
})

export type UserSupportProps = t.TypeOf<typeof UserSupportPropsCodec>
