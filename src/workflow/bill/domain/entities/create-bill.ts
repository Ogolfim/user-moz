import { CreateBillDB } from '@bill/domain/Contracts/CreateBill'
import clientDB from '@core/domain/entities/db'
import dayjs from 'dayjs'

export const createBillDB: CreateBillDB = async (data) => {
  const { userId, period, pricingId, teamMemberLimit, invoices, status, nextPayDate } = data
  const collection = (await clientDB).db().collection('bills')

  const today = dayjs(new Date())
  const createdAt = today.format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  const { insertedId } = await collection.insertOne({
    userId,
    period,
    pricingId,
    teamMemberLimit,
    invoices,
    status,
    createdAt
  })
  const id = insertedId.toString()

  return {
    id,
    userId,
    teamMemberLimit,
    period,
    pricingId,
    invoices,
    status,
    nextPayDate,
    createdAt
  }
}
