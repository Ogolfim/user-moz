import { GetBillsDB } from '@bill/domain/Contracts/GetBills'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'

export const getBillsDB: GetBillsDB = async ({ userId }) => {
  const collection = (await clientDB).db().collection('bills')

  const found = await collection.find({ userId }).sort({ _id: -1 }).limit(10).toArray() as unknown as BillEntity[]

  if (!found) {
    throw new EntityNotFoundError()
  }

  const bills = found.map((bill) => {
    const { _id, userId, teamMemberLimit, period, pricingId, invoices, status, createdAt, nextPayDate } = bill

    return {
      id: _id.toString(),
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

  return bills
}
