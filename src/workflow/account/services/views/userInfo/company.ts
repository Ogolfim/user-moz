import { AddressSchema, CompanySchema } from '@account/infra/prisma/schemas'
import { Address, addressView } from '@account/services/views/address'

interface ICompany extends CompanySchema {
  address: AddressSchema
  employees: 
}

export interface Company {
  name: string
  employees: Employee[]
  phone: string
  address: Address
}

export const CompanyView = (company: ICompany): Company => {
  return {
    name: company.name,
    phone: company.phone,
    address: addressView(company.address)
  }
}

export const manyCompaniesView = (companies: ICompany[]): Company[] => {
  return companies.map(company => CompanyView(company))
}
