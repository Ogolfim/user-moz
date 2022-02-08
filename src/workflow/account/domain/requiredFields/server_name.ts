import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isServerName } from '@account/domain/requiredFields/is/is_server_name'

type ServerNameBrand = {
  readonly ServerName: unique symbol
}

export const ServerNameCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, ServerNameBrand> => isServerName(value),
    'ServerName'
  ),
  () => 'Nome do servidor'
)

const IntersectServerName = t.intersection([t.string, ServerNameCodec])

export type ServerName = t.TypeOf<typeof IntersectServerName>
