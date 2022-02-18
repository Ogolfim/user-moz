import * as t from 'io-ts'
import { NameCodec } from '@account/domain/requiredFields/name'
import { UUID } from 'io-ts-types'
import { PhoneCodec } from '@account/domain/requiredFields/phone'
import { AddressCodec } from '@account/domain/requiredFields/address'
import { DateCodec } from '@account/domain/requiredFields/date'

export const CreateStudentInfoPropsCodec = t.type({
  userId: UUID,
  phone: PhoneCodec,
  address: AddressCodec,
  bornAt: DateCodec,
  schoolName: NameCodec,
  studentId: NameCodec
})

export type CreateStudentInfoProps = t.TypeOf<typeof CreateStudentInfoPropsCodec>
