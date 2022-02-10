import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isAddress2 } from '@bills/domain/requiredFields/is/is_address_2'

type Address2Brand = {
  readonly Address2: unique symbol
}

export const Address2Codec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, Address2Brand> => isAddress2(value),
    'Address2'
  ),
  () => 'Endereço invalido'
)

const IntersectAddress2 = t.intersection([t.string, Address2Codec])

export type Address2 = t.TypeOf<typeof IntersectAddress2>
