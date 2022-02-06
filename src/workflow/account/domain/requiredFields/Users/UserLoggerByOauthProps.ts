import * as t from 'io-ts'

import { EmailCodec } from '../Email'
import { NameCodec } from '../Name'
import { ServerNameCodec } from '../ServerName'

export const UserLoggerByOauthPropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  serverName: ServerNameCodec
})

export type UserLoggerByOauthProps = t.TypeOf<typeof UserLoggerByOauthPropsCodec>
