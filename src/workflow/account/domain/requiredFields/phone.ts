import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isPhone } from '@bills/domain/requiredFields/is/is_phone'

type PhoneBrand = {
  readonly Phone: unique symbol
}

export const PhoneCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PhoneBrand> => isPhone(value),
    'Phone'
  ),
  () => 'Número de telefone'
)

const IntersectPhone = t.intersection([t.string, PhoneCodec])

export type Phone = t.TypeOf<typeof IntersectPhone>
