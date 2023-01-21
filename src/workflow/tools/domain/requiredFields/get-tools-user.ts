import { IdCodec } from '@user/domain/requiredFields/id'
import * as t from 'io-ts'

export const GetToolsUserPropsCodec = t.type({
  userId: IdCodec
})

export type GetToolsUserProps = t.TypeOf<typeof GetToolsUserPropsCodec>
