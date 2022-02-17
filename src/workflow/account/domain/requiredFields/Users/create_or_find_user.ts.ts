import * as t from 'io-ts'

import { EmailCodec } from '@account/domain/requiredFields/email'
import { NameCodec } from '@account/domain/requiredFields/name'
import { ServerNameCodec } from '@account/domain/requiredFields/server_name'
import { AccountTypeCodec } from '@account/domain/requiredFields/account_type'

export const CreateOrFindUserPropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  serverName: ServerNameCodec,
  accountType: AccountTypeCodec
})

export type CreateOrFindUserProps = t.TypeOf<typeof CreateOrFindUserPropsCodec>
