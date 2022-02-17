import { AddressSchema, StudentSchema } from '@account/infra/prisma/schemas'
import { Address, addressView } from '@account/services/views/address'

interface IStudent extends StudentSchema {
  address: AddressSchema
}

export interface Student {
  verified: boolean
  bornAt: string
  schoolName: string
  studentId: string
  phone: string
  address: Address
}

export const studentView = (student: IStudent): Student => {
  return {
    verified: student.verified,
    bornAt: student.bornAt,
    schoolName: student.schoolName,
    studentId: student.studentId,
    phone: student.phone,
    address: addressView(student.address)
  }
}

export const manyStudentView = (students: IStudent[]): Student[] => {
  return students.map(student => studentView(student))
}
