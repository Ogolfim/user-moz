import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { EmailCodec } from '@bills/domain/requiredFields/email'
import { NameCodec } from '@bills/domain/requiredFields/name'
import { PhoneCodec } from '@bills/domain/requiredFields/phone'
import { AccountTypeCodec } from '@account/domain/requiredFields/account_type'
import { AddressCodec } from '@bills/domain/requiredFields/address'

export const ICreateCustomerCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  phone: PhoneCodec,
  accountType: AccountTypeCodec,
  address: AddressCodec,
  userId: UUID
})

export type IFindOrCreateCustomer = t.TypeOf<typeof ICreateCustomerCodec>
