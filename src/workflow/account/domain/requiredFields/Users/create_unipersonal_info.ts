import * as t from 'io-ts'
import { AddressCodec } from '@account/domain/requiredFields/address'
import { UUID } from 'io-ts-types'
import { PhoneCodec } from '../phone'

export const CreateUnipersonalInfoPropsCodec = t.type({
  userId: UUID,
  phone: PhoneCodec,
  address: AddressCodec
})

export type CreateUnipersonalInfoProps = t.TypeOf<typeof CreateUnipersonalInfoPropsCodec>
