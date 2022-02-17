import { AddressSchema, EmployeeSchema } from '@account/infra/prisma/schemas'

interface IEmployee extends EmployeeSchema {
  address: AddressSchema
}

export interface Employee {
  verified: boolean
  name: string
  email: string
  companyId: string
  phone: string
}

export const employeeView = (employee: IEmployee): Employee => {
  return {
    verified: employee.verified,
    name: employee.name,
    email: employee.email,
    companyId: employee.companyId,
    phone: employee.phone
  }
}

export const manyEmployeeView = (employees: IEmployee[]): Employee[] => {
  return employees.map(employee => employeeView(employee))
}
