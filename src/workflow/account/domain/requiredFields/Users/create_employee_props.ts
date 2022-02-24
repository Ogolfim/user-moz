import * as t from 'io-ts'
import { EmailCodec } from '@account/domain/requiredFields/email'
import { UUID } from 'io-ts-types'
import { NameCodec } from '@account/domain/requiredFields/name'

export const CreateEmployeePropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  businessAdminId: UUID
})

export type CreateEmployeeProps = t.TypeOf<typeof CreateEmployeePropsCodec>
