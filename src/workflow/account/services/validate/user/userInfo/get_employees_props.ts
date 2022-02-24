import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { failure } from 'io-ts/lib/PathReporter'
import { GetEmployeesValidator } from '@account/domain/contracts/User/UserInfo/GetEmployees'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export const getEmployeesPropsValidate: GetEmployeesValidator = (businessAdminId) => {
  return pipe(
    UUID.decode(businessAdminId),
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
