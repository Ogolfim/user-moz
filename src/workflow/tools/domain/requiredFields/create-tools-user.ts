import { IdCodec } from '@user/domain/requiredFields/id'
import * as t from 'io-ts'

export const CreateToolsUserPropsCodec = t.type({
  userId: IdCodec
})

export type CreateToolsUserProps = t.TypeOf<typeof CreateToolsUserPropsCodec>
