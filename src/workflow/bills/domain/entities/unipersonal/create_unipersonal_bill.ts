import { prisma } from '@core/infra/prisma/client'
import { CreateUnipersonalBillDB } from '@bills/domain/Contracts/Unipersonal/CreateUnipersonalBill'

export const createUnipersonalBillDB: CreateUnipersonalBillDB = async (billInfo) => {
  const { services, totalAmount, nextBillableDay, note, unipersonalId } = billInfo

  await prisma.bill.deleteMany({
    where: { unipersonalId }
  })

  const newBill = await prisma.bill.create({
    data: {
      services,
      totalAmount,
      nextBillableDay,
      note,
      unipersonalId
    }
  })

  return newBill
}
