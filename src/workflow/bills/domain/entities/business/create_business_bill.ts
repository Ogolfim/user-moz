import { prisma } from '@core/infra/prisma/client'
import { CreateBusinessBillDB } from '@bills/domain/Contracts/Business/CreateBusinessBill'

export const createBusinessBillDB: CreateBusinessBillDB = async (billInfo) => {
  const { services, totalAmount, nextBillableDay, note, businessId } = billInfo

  await prisma.bill.deleteMany({
    where: { businessId }
  })

  const newBill = await prisma.bill.create({
    data: {
      services,
      totalAmount,
      nextBillableDay,
      note,
      businessId
    }
  })

  return newBill
}
