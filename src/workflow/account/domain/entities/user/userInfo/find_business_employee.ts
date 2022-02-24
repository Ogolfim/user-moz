import { FindBusinessEmployeesDB } from '@account/domain/contracts/User/UserInfo/GetEmployees'
import { prisma } from '@core/infra/prisma/client'
import { accountTypes } from '../../db'

export const findBusinessEmployeesDB: FindBusinessEmployeesDB = async (businessId) => {
  return await prisma.user.findMany({
    where: {
      accountType: accountTypes.employee,
      employee: {
        AND: {
          businessId
        }
      }
    }
  })
}
