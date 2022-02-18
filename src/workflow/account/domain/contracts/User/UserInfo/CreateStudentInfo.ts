import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateStudentInfoProps } from '@account/domain/requiredFields/Users/create_Student_info'
import { StudentSchema } from '@account/infra/prisma/schemas'
import { Address } from 'user-moz'
import { UUID } from 'io-ts-types'

export interface UnValidatedStudent {
  userId: UUID
  phone: string
  address: Address
  bornAt: Date,
  schoolName: string,
  studentId: string
}

export type CreateStudentInfoValidator = (data: UnValidatedStudent) => E.Either<ValidationError, CreateStudentInfoProps>

export type CreateStudentInfoDB = (user: CreateStudentInfoProps) => Promise<StudentSchema>
export type GetStudentInfoByUserIdDB = (userId: UUID) => Promise<StudentSchema>

export type CreateStudentInfoService = (createStudentInfoDB: CreateStudentInfoDB) =>
(getStudentInfoByUserIdDB: GetStudentInfoByUserIdDB) => (user: CreateStudentInfoProps) => TE.TaskEither<HttpErrorResponse, StudentSchema>
