import * as t from 'io-ts'
import { EmailCodec } from '@account/domain/requiredFields/email'
import { UUID } from 'io-ts-types'

export const CreateEmployeeInfoPropsCodec = t.type({
  businessAdminId: UUID,
  email: EmailCodec
})

export type CreateEmployeeInfoProps = t.TypeOf<typeof CreateEmployeeInfoPropsCodec>
