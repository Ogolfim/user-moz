import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isServerName } from './is/isServerName'

type ServerNameBrand = {
  readonly ServerName: unique symbol
}

export const ServerNameCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, ServerNameBrand> =>  isServerName(value),
    'ServerName'
  ),
  () => 'Ops! Nome do servidor invalido'
)

const IntersectServerName = t.intersection([t.string, ServerNameCodec])

export type ServerName = t.TypeOf<typeof IntersectServerName>