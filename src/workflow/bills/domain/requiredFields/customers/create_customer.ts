import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { EmailCodec } from '@bills/domain/requiredFields/email'
import { NameCodec } from '@bills/domain/requiredFields/name'
import { PhoneCodec } from '@account/domain/requiredFields/phone'
import { AccountTypeCodec } from '@account/domain/requiredFields/account_type'
import { AddressCodec } from '@account/domain/requiredFields/address'

export const ICreateCustomerCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  phone: PhoneCodec,
  accountType: AccountTypeCodec,
  address: AddressCodec,
  userId: UUID
})

export type IFindOrCreateCustomer = t.TypeOf<typeof ICreateCustomerCodec>
