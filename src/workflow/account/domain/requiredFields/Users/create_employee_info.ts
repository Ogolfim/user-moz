import * as t from 'io-ts'
import { NameCodec } from '@account/domain/requiredFields/name'
import { UUID } from 'io-ts-types'

export const CreateEmployeeInfoPropsCodec = t.type({
  userId: UUID,
  companyId: NameCodec
})

export type CreateEmployeeInfoProps = t.TypeOf<typeof CreateEmployeeInfoPropsCodec>
