import { FindActiveBillsDB } from '@bill/domain/Contracts/FindBills'
import clientDB from '@core/domain/entities/db'
import { BillEntity, BillStatus } from 'bill'

export const findActiveBillsDB: FindActiveBillsDB = async () => {
  const collection = (await clientDB).db().collection('bills')

  const status: BillStatus = 'ACTIVE'

  const foundBills = await collection.find({ status }).toArray() as unknown as BillEntity[]

  if (!foundBills[0]) {
    return []
  }

  const bills = foundBills.map((bill) => {
    const {
      _id,
      userId,
      teamMemberLimit,
      period,
      pricingId,
      invoices,
      status,
      nextPayDate,
      createdAt
    } = bill
    return {
      id: _id,
      userId,
      teamMemberLimit,
      period,
      pricingId,
      invoices,
      status,
      nextPayDate,
      createdAt
    }
  })

  return bills.reverse()
}
