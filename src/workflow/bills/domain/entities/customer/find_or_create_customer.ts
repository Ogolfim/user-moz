import { prisma } from '@account/infra/prisma/client'
import { FindOrCreateCustomerDB } from '@bills/domain/Contracts/Customer/FindOrCreateCustomer'

export const findOrCreateCustomerDB: FindOrCreateCustomerDB = async (customer) => {
  const { name, email, phone, accountType, address, userId } = customer

  const customerFound = await prisma.customer.findUnique({
    where: { userId }
  })

  if (customerFound) {
    return customerFound
  }

  const newCustomer = await prisma.customer.create({
    data: {
      name,
      email,
      phone,
      accountType,
      userId,
      address: {
        create: address
      }
    }
  })

  return newCustomer
}
