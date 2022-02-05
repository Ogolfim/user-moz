import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isEmail } from './is/isEmail'

type EmailBrand = {
  readonly Email: unique symbol
}

export const EmailCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, EmailBrand> => isEmail(value),
    'Email'
  ),
  () => 'Ops! Email invalido'
)

const IntersectEmail = t.intersection([t.string, EmailCodec])

export type Email = t.TypeOf<typeof IntersectEmail>
