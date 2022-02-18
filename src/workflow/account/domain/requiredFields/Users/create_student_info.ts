import * as t from 'io-ts'
import { NameCodec } from '@account/domain/requiredFields/name'
import { DateFromISOString, UUID } from 'io-ts-types'
import { PhoneCodec } from '@account/domain/requiredFields/phone'
import { AddressCodec } from '@account/domain/requiredFields/address'

export const CreateStudentInfoPropsCodec = t.type({
  userId: UUID,
  phone: PhoneCodec,
  bornAt: DateFromISOString,
  schoolName: NameCodec,
  studentId: NameCodec,
  address: AddressCodec
})

export type CreateStudentInfoProps = t.TypeOf<typeof CreateStudentInfoPropsCodec>
