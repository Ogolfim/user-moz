import * as t from 'io-ts'

import { EmailCodec } from '../email'
import { NameCodec } from '../name'
import { ServerNameCodec } from '../server_name'

export const UserLoggerByOauthPropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  serverName: ServerNameCodec
})

export type UserLoggerByOauthProps = t.TypeOf<typeof UserLoggerByOauthPropsCodec>
