import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isAddress1 } from '@bills/domain/requiredFields/is/is_address_1'

type Address1Brand = {
  readonly Address1: unique symbol
}

export const Address1Codec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, Address1Brand> => isAddress1(value),
    'Address1'
  ),
  () => 'Endereço invalido'
)

const IntersectAddress1 = t.intersection([t.string, Address1Codec])

export type Address1 = t.TypeOf<typeof IntersectAddress1>
