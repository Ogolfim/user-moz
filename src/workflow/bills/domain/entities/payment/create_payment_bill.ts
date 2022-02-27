import { prisma } from '@core/infra/prisma/client'
import { CreateBillPaymentDB } from '@bills/domain/Contracts/Payment/CreateBillPayment'

export const createBillPaymentDB: CreateBillPaymentDB = async (bill) => {
  const { paymentStatus, amount, paymentDeadline, billId } = bill

  const newPayment = await prisma.payment.create({
    data: {
      paymentStatus,
      amount,
      paymentDeadline,
      billId
    }
  })

  return newPayment
}
