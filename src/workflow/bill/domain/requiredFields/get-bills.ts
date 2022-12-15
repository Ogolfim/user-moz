import { IdCodec } from '@bill/domain/requiredFields/id'
import * as t from 'io-ts'

export const GetBillsPropsCodec = t.type({
  userId: IdCodec
})

export type GetBillsProps = t.TypeOf<typeof GetBillsPropsCodec>
