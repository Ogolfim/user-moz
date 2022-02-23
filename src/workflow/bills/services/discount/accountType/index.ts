import * as TE from 'fp-ts/lib/TaskEither'
import { accountTypes } from '@account/domain/entities/db'
import { CreateAccountTypeDiscount } from '@bills/domain/Contracts'
import { findUserByIdDB } from '@bills/domain/entities/user/find_user_by_id'
import { businessDiscount } from '@bills/services/discount/accountType/business'
import { studentDiscount } from '@bills/services/discount/accountType/student'
import { unipersonalDiscount } from '@bills/services/discount/accountType/unipersonal'
import { pipe } from 'fp-ts/lib/function'

export const createAccountTypeDiscount: CreateAccountTypeDiscount = (findUserByIdService) =>
  (countEmployeesService) => (bill) => {
    const { servicesCost, discount, userId } = bill
    const { business, student, unipersonal } = accountTypes

    const billDiscounted = pipe(
      userId,
      findUserByIdService(findUserByIdDB),
      TE.map(user => {
        const { accountType } = user

        console.log('Remove number of employees 3')

        const newDiscount = new Map<string, number>()
        newDiscount.set(business, businessDiscount(2)(servicesCost))
        newDiscount.set(student, studentDiscount(servicesCost))
        newDiscount.set(unipersonal, unipersonalDiscount(servicesCost))

        const disco = discount + newDiscount.get(accountType)

        return disco
      })
    )

    return billDiscounted
  }
