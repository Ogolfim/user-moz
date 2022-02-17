import { AddressSchema, CompanySchema, EmployeeSchema } from '@account/infra/prisma/schemas'
import { Address, addressView } from '@account/services/views/address'
import { Employee } from '@account/services/views/userInfo/employee'

interface ICompany extends CompanySchema {
  address: AddressSchema
  employees: EmployeeSchema[]
}

interface IEmployee extends Employee {
  id: string
}

export interface Company {
  name: string
  employees: IEmployee[]
  phone: string
  address: Address
}

export const companyView = (company: ICompany): Company => {
  return {
    name: company.name,
    phone: company.phone,
    employees: employeesView(company.employees),
    address: addressView(company.address)
  }
}

export const manyCompaniesView = (companies: ICompany[]): Company[] => {
  return companies.map(company => companyView(company))
}

function employeesView (employees: EmployeeSchema[]): IEmployee[] {
  return employees.map(employee => ({
    id: employee.id,
    verified: employee.verified,
    companyId: employee.companyId
  }))
}
