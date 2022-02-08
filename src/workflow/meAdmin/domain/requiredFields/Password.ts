import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isPassword } from '@meAdmin/domain/requiredFields/is/is_password'

type PasswordBrand = {
  readonly Password: unique symbol
}

export const PasswordCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PasswordBrand> => isPassword(value),
    'Password'
  ),
  () => 'Senha'
)

const IntersectPassword = t.intersection([t.string, PasswordCodec])

export type Password = t.TypeOf<typeof IntersectPassword>
