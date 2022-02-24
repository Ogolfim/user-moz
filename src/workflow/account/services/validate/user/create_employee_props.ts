import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { CreateEmployeePropsCodec } from '@account/domain/requiredFields/Users/create_employee_props'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateEmployeeValidator } from '@account/domain/contracts/User/CreateUser/CreateEmployee'

export const createEmployeePropsValidate: CreateEmployeeValidator = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Nome, email estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      CreateEmployeePropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
