import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { CreateBillService } from '@bills/domain/Contracts'
import { createDiscount } from '@bills/services/discount/createDiscount'
import { createServicesNumberDiscount } from '@bills/services//discount/servicesNumber'
import { createBillPeriodDiscount } from '@bills/services/discount/billPeriod'
import { createAccountTypeDiscount } from '@bills/services/discount/accountType'
import { servicesCost } from '@bills/services/bill/servicesCost/services_cost'
import { createNextBillableDay } from '@bills/services/bill/billableDay/next_billable_day'
import { findUserByIdService } from './find_user_by_id'
import { findUserByIdDB } from '@bills/domain/entities/user/find_user_by_id'
import { accountTypes } from '@account/domain/entities/db'
import { createBusinessBillService } from './business/create_business_bill'
import { createStudentBillService } from './student/create_student_bill'
import { createUnipersonalBillService } from './unipersonal/create_unipersonal_bill'
import { createUnipersonalBillDB } from '@bills/domain/entities/unipersonal/create_unipersonal_bill'
import { createStudentBillDB } from '@bills/domain/entities/student/create_student_bill'
import { createBusinessBillDB } from '@bills/domain/entities/business/create_business_bill'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { BillSchema } from '@core/infra/prisma/schemas'
import { findBusinessByAdminIdDB } from '@bills/domain/entities/business/find_business_by_admin_id'
import { findUnipersonalByUserIdDB } from '@bills/domain/entities/unipersonal/find_business_by_user_id'
import { findStudentByUserIdDB } from '@bills/domain/entities/student/find_student_by_user_id'

export const createBillService: CreateBillService = (data) => {
  const { services, billPeriod, userId } = data

  const cost = servicesCost(services)(billPeriod)

  const bill = pipe(
    userId,
    findUserByIdService(findUserByIdDB),
    TE.chain(user => {
      const { accountType } = user

      const ICreateDiscount = {
        services,
        billPeriod,
        userId,
        accountType,
        servicesCost: cost
      }

      return pipe(
        ICreateDiscount,
        createDiscount(createServicesNumberDiscount)(createBillPeriodDiscount)(createAccountTypeDiscount),
        TE.chain(discount => {
          const { business, unipersonal, student } = accountTypes

          const nextBillableDay = createNextBillableDay(billPeriod)

          const IBill = {
            services,
            totalAmountToPay: cost - discount,
            nextBillableDay,
            note: '',
            userId
          }

          const createBill = new Map<string, TE.TaskEither<HttpErrorResponse, BillSchema>>()

          createBill.set(business, createBusinessBillService(createBusinessBillDB)(findBusinessByAdminIdDB)(IBill))
          createBill.set(unipersonal, createUnipersonalBillService(createUnipersonalBillDB)(findUnipersonalByUserIdDB)(IBill))
          createBill.set(student, createStudentBillService(createStudentBillDB)(findStudentByUserIdDB)(IBill))

          return createBill.get(accountType)
        })
      )
    })
  )

  return bill
}
