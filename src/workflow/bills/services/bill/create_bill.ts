import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { CreateBillService } from '@bills/domain/Contracts'
import { createDiscount } from '@bills/services/discount/createDiscount'
import { createServicesNumberDiscount } from '@bills/services//discount/servicesNumber'
import { createBillPeriodDiscount } from '@bills/services/discount/billPeriod'
import { createAccountTypeDiscount } from '@bills/services/discount/accountType'
import { servicesCost } from '@bills/services/bill/servicesCost/services_cost'
import { findUserByIdService } from './find_user_by_id'
import { findUserByIdDB } from '@bills/domain/entities/user/find_user_by_id'
import { accountTypes } from '@account/domain/entities/db'
import { createBusinessBillService } from './business/create_business_bill'
import { createStudentBillService } from './student/create_student_bill'
import { createUnipersonalBillService } from './unipersonal/create_unipersonal_bill'
import { createUnipersonalBillDB } from '@bills/domain/entities/unipersonal/create_unipersonal_bill'
import { createStudentBillDB } from '@bills/domain/entities/student/create_student_bill'

export const createBillService: CreateBillService = (data) => {
  const { services, billPeriod, userId } = data

  const cost = servicesCost(services)(billPeriod)

  const bill = pipe(
    userId,
    findUserByIdService(findUserByIdDB),
    TE.chain(user => {
      const { accountType } = user

      const ICreateDiscount = {
        ...data,
        accountType,
        servicesCost: cost
      }

      return pipe(
        ICreateDiscount,
        createDiscount(createServicesNumberDiscount)(createBillPeriodDiscount)(createAccountTypeDiscount),
        TE.chain(cost => {
          const { business, unipersonal, student } = accountTypes

          const bill = {
            services,
            totalAmountToPay: cost,
            nextBillableDay: new Date,
            note: ''
          }

          const businessBill = {
            ...bill,
            businessId: userId
          }

          const createBill = new Map()

          createBill.set(business, createBusinessBillService(createBusinessBillDB)())
          createBill.set(unipersonal, createUnipersonalBillService(createUnipersonalBillDB)())
          createBill.set(student, createStudentBillService(createStudentBillDB)())
        })
      )
    })
  )

  return bill
}
