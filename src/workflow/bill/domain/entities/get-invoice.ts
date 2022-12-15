import { GetInvoiceDB } from '@bill/domain/Contracts/GetInvoice'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'
import { ObjectId } from 'mongodb'

export const getInvoiceDB: GetInvoiceDB = async ({ billId, invoiceCode }) => {
  const _id = new ObjectId(billId)
  const collection = (await clientDB).db().collection('bills')

  const foundBill = await collection.findOne({ _id }) as unknown as BillEntity

  if (!foundBill) {
    throw new EntityNotFoundError()
  }

  const { invoices } = foundBill

  const invoice = invoices.find(invoice => invoice.invoiceCode === invoiceCode)

  if (!invoice) {
    throw new EntityNotFoundError()
  }

  return invoice
}
