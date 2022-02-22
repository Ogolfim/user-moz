import { accountTypes } from '@account/domain/entities/db'
import { CreateAccountTypeDiscount } from '@bills/domain/Contracts'
import { businessDiscount } from '@bills/services/discount/accountType/business'
import { studentDiscount } from '@bills/services/discount/accountType/student'
import { unipersonalDiscount } from '@bills/services/discount/accountType/unipersonal'

export const createServicesNumberDiscount: CreateAccountTypeDiscount = (bill) => {
  const { servicesCost, accountType, totalAmountToPay, employeesNumber } = bill
  const { business, student, unipersonal } = accountTypes

  const discount = new Map<string, number>()
  discount.set(business, businessDiscount(employeesNumber)(servicesCost))
  discount.set(student, studentDiscount(servicesCost))
  discount.set(unipersonal, unipersonalDiscount(servicesCost))

  const billDiscounted = {
    ...bill,
    totalAmountToPay: totalAmountToPay - discount.get(accountType)
  }

  return billDiscounted
}
