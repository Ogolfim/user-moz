import * as TE from 'fp-ts/lib/TaskEither'
import { accountTypes } from '@account/domain/entities/db'
import { CreateAccountTypeDiscount } from '@bills/domain/Contracts'
import { businessDiscount } from '@bills/services/discount/accountType/business'
import { studentDiscount } from '@bills/services/discount/accountType/student'
import { unipersonalDiscount } from '@bills/services/discount/accountType/unipersonal'
import { clientError } from '@core/infra/http_error_response'

export const createAccountTypeDiscount: CreateAccountTypeDiscount = (bill) => {
  const { servicesCost, discount, userId, accountType } = bill
  const { business, student, unipersonal } = accountTypes

  const costDiscounted = TE.tryCatch(
    async () => {
      if (accountType === student) {
        return discount + studentDiscount(servicesCost)
      }

      if (accountType === unipersonal) {
        return discount + unipersonalDiscount(servicesCost)
      }

      if (accountType === business) {
        return discount + await businessDiscount(userId)(servicesCost)
      }
    },
    (_err) => clientError(new Error('Oops! Por favor, dê-nos informações da sua emprise'))
  )

  return costDiscounted
}
