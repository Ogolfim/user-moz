import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { CreateStudentInfoValidator } from '@account/domain/contracts/User/UserInfo/CreateStudentInfo'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateStudentInfoPropsCodec } from '@account/domain/requiredFields/Users/create_student_info'

export const createStudentInfoPropsValidate: CreateStudentInfoValidator = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Oops! Você não forneceu nenhum dado')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      CreateStudentInfoPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
