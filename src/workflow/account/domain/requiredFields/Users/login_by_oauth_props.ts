import * as t from 'io-ts'

import { EmailCodec } from '@account/domain/requiredFields/email'
import { NameCodec } from '@account/domain/requiredFields/name'
import { ServerNameCodec } from '@account/domain/requiredFields/server_name'

export const UserLoggerByOauthPropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  serverName: ServerNameCodec
})

export type UserLoggerByOauthProps = t.TypeOf<typeof UserLoggerByOauthPropsCodec>
