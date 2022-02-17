import { Tag, User, UserRefreshToken, Bill, Payment, Unipersonal, Company, Student, Address, Employee } from '@prisma/client'

export type UserSchema = User

export type RefreshTokenSchema = UserRefreshToken

export type TagSchema = Tag

export type BillSchema = Bill
export type PaymentSchema = Payment

export type ServiceSchema = {
  api: string
  webDownload: string
}

export type AddressSchema = Address

export type CompanySchema = Company
export type UnipersonalSchema = Unipersonal
export type StudentSchema = Student
export type EmployeeSchema = Employee
