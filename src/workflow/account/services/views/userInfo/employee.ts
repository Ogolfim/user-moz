import { EmployeeSchema } from '@account/infra/prisma/schemas'

export interface Employee {
  verified: boolean
  companyId: string
}

export const employeeView = (employee: EmployeeSchema): Employee => {
  return {
    verified: employee.verified,
    companyId: employee.companyId
  }
}

export const manyEmployeeView = (employees: EmployeeSchema[]): Employee[] => {
  return employees.map(employee => employeeView(employee))
}
