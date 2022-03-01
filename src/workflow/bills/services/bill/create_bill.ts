import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { CreateBillService } from '@bills/domain/Contracts'
import { createDiscount } from '@bills/services/discount/createDiscount'
import { createServicesNumberDiscount } from '@bills/services//discount/servicesNumber'
import { createBillPeriodDiscount } from '@bills/services/discount/billPeriod'
import { createAccountTypeDiscount } from '@bills/services/discount/accountType'
import { servicesCost } from '@bills/services/bill/servicesCost/services_cost'
import { createNextBillableDay } from '@bills/services/bill/billableDay/next_billable_day'
import { accountTypes } from '@account/domain/entities/db'
import { createBusinessBillService } from '@bills/services/bill/business/create_business_bill'
import { createStudentBillService } from '@bills/services/bill/student/create_student_bill'
import { createUnipersonalBillService } from '@bills/services/bill/unipersonal/create_unipersonal_bill'
import { createUnipersonalBillDB } from '@bills/domain/entities/unipersonal/create_unipersonal_bill'
import { createStudentBillDB } from '@bills/domain/entities/student/create_student_bill'
import { createBusinessBillDB } from '@bills/domain/entities/business/create_business_bill'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { BillSchema } from '@core/infra/prisma/schemas'
import { findBusinessByAdminIdDB } from '@bills/domain/entities/business/find_business_by_admin_id'
import { findUnipersonalByUserIdDB } from '@bills/domain/entities/unipersonal/find_business_by_user_id'
import { findStudentByUserIdDB } from '@bills/domain/entities/student/find_student_by_user_id'
import { createBillPaymentService } from '@bills/services/payment/create_payment_bill'
import { createBillPaymentDB } from '@bills/domain/entities/payment/create_payment_bill'
import { paymentStatus } from '@bills/domain/entities/db'
import dayjs from 'dayjs'
import { Decimal } from 'user-moz'

export const createBillService: CreateBillService = (data) => {
  const { services, billPeriod, userId, accountType } = data

  const cost = servicesCost(services)(billPeriod)

  const ICreateDiscount = {
    services,
    billPeriod,
    userId,
    accountType,
    servicesCost: cost
  }

  const bill = pipe(
    ICreateDiscount,
    createDiscount(createServicesNumberDiscount)(createBillPeriodDiscount)(createAccountTypeDiscount),
    TE.chain(discount => {
      const { business, unipersonal, student } = accountTypes

      const nextBillableDay = createNextBillableDay(billPeriod)

      const total = cost - discount

      const IBill = {
        services,
        totalAmountToPay: total as unknown as Decimal,
        nextBillableDay,
        note: '',
        userId
      }

      const createBill = new Map<string, TE.TaskEither<HttpErrorResponse, BillSchema>>()

      createBill.set(business, createBusinessBillService(createBusinessBillDB)(findBusinessByAdminIdDB)(IBill))
      createBill.set(unipersonal, createUnipersonalBillService(createUnipersonalBillDB)(findUnipersonalByUserIdDB)(IBill))
      createBill.set(student, createStudentBillService(createStudentBillDB)(findStudentByUserIdDB)(IBill))

      return createBill.get(accountType)
    }),
    TE.chain(bill => {
      const { id, totalAmountToPay } = bill
      const { padding } = paymentStatus
      const deadline = new Date(dayjs().add(7, 'day').format())

      const IPaymentBill = {
        paymentStatus: padding,
        amount: totalAmountToPay,
        paymentDeadline: deadline,
        billId: id
      }

      return pipe(
        IPaymentBill,
        createBillPaymentService(createBillPaymentDB),
        TE.map((payment) => {
          return { ...bill, payment }
        })
      )
    })
  )

  return bill
}
