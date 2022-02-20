import { Tag, User, Bill, Payment, Unipersonal, Business, Student, Address, Employee, UserServices } from '@prisma/client'

export type UserSchema = User

export type TagSchema = Tag

export type BillSchema = Bill
export type PaymentSchema = Payment

export type ServiceSchema = {
    api: string
    webDownload: string
  }

export type UserServicesSchema = UserServices

export type AddressSchema = Address

export type CompanySchema = Business
export type UnipersonalSchema = Unipersonal
export type StudentSchema = Student
export type EmployeeSchema = Employee
