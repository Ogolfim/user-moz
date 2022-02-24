import * as TE from 'fp-ts/lib/TaskEither'
import { accountTypes } from '@account/domain/entities/db'
import { CreateAccountTypeDiscount } from '@bills/domain/Contracts'
import { findUserByIdDB } from '@bills/domain/entities/user/find_user_by_id'
import { businessDiscount } from '@bills/services/discount/accountType/business'
import { studentDiscount } from '@bills/services/discount/accountType/student'
import { unipersonalDiscount } from '@bills/services/discount/accountType/unipersonal'
import { pipe } from 'fp-ts/lib/function'
import { fail } from '@core/infra/http_error_response'

export const createAccountTypeDiscount: CreateAccountTypeDiscount = (findUserByIdService) =>
  (countEmployeesDB) => (bill) => {
    const { servicesCost, discount, userId } = bill
    const { business, student, unipersonal } = accountTypes

    const billDiscounted = pipe(
      userId,
      findUserByIdService(findUserByIdDB),
      TE.chain(user => {
        const { accountType } = user

        return TE.tryCatch(
          async () => {
            const newDiscount = new Map<string, number>()
            newDiscount.set(business, await businessDiscount(userId)(servicesCost))
            newDiscount.set(student, studentDiscount(servicesCost))
            newDiscount.set(unipersonal, unipersonalDiscount(servicesCost))

            const disco = discount + newDiscount.get(accountType)

            return disco
          },
          err => {
            console.log(err)
            return fail(new Error('Oops! Por favor, dê-nos informações da sua empresa'))
          }
        )
      })
    )

    return billDiscounted
  }
