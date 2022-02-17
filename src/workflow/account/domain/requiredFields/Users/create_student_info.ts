import * as t from 'io-ts'
import { NameCodec } from '@account/domain/requiredFields/name'
import { UUID } from 'io-ts-types'
import { PhoneCodec } from '@account/domain/requiredFields/phone'
import { AddressCodec } from '@account/domain/requiredFields/address'

export const CreateStudentInfoPropsCodec = t.type({
  userId: UUID,
  name: NameCodec,
  phone: PhoneCodec,
  address: AddressCodec,
  bornAt: Date
  schoolName: NameCodec,
  studentId: 
})

export type CreateStudentInfoProps = t.TypeOf<typeof CreateStudentInfoPropsCodec>
