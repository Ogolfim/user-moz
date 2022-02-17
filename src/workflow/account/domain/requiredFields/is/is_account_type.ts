import { accountTypes } from '@account/domain/entities/db'

export const isAccountType = (value: string) => {
  if (value === accountTypes.unipersonal ||
      value === accountTypes.company ||
      value === accountTypes.student
  ) {
    return true
  }

  return false
}
