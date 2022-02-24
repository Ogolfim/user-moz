import { countEmployeesDB } from '@bills/domain/entities/business/count_employees'
import { EntityNotFoundError } from '@bills/domain/entities/errors/db_error'
import { UUID } from 'io-ts-types'

export const businessDiscount = (adminId: UUID) => async (servicesCost: number): Promise<number> => {
  const employeesNumber = await countEmployeesDB(adminId)

  if (!employeesNumber) {
    throw new EntityNotFoundError('Oops! Por favor, dê-nos informações da sua empresa')
  }

  const businessDiscountPercentage = Number(process.env.COMPANY_DISCOUNT)

  if (employeesNumber >= 2) {
    return servicesCost * businessDiscountPercentage / 100
  }

  return 0
}
