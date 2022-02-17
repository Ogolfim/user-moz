import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { CreateEmployeeInfoValidator } from '@account/domain/contracts/User/UserInfo/CreateEmployeeInfo'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateEmployeeInfoPropsCodec } from '@account/domain/requiredFields/Users/create_employee_info'

export const createEmployeeInfoPropsValidate: CreateEmployeeInfoValidator = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Nome, email e nome do servidor estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      CreateEmployeeInfoPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
