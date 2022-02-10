import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isAccountType } from '@bills/domain/requiredFields/is/is_account_type'

type AccountTypeBrand = {
  readonly AccountType: unique symbol
}

export const AccountTypeCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, AccountTypeBrand> => isAccountType(value),
    'AccountType'
  ),
  () => 'AccountType'
)

const IntersectAccountType = t.intersection([t.string, AccountTypeCodec])

export type AccountType = t.TypeOf<typeof IntersectAccountType>
