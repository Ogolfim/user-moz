import * as t from 'io-ts'
import { NameCodec } from '@account/domain/requiredFields/name'
import { UUID } from 'io-ts-types'
import { PhoneCodec } from '@account/domain/requiredFields/phone'
import { AddressCodec } from '@account/domain/requiredFields/address'

export const CreateCompanyInfoPropsCodec = t.type({
  userId: UUID,
  name: NameCodec,
  phone: PhoneCodec,
  address: AddressCodec
})

export type CreateCompanyInfoProps = t.TypeOf<typeof CreateCompanyInfoPropsCodec>
