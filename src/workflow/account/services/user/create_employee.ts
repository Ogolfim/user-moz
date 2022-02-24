import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { CreateEmployeeService } from '@account/domain/contracts/User/CreateUser/createEmployee'
import { hashPassword } from '@account/services/password/hash'
import { DatabaseFailError, EntityAlreadyExistError, EntityNotFoundError } from '@account/domain/entities/errors/db_error'
import { PasswordHashError } from '@account/services/password/errors/hash_errors'
import { Password } from '@account/domain/requiredFields/password'

export const createEmployeeService: CreateEmployeeService = (createEmployeeDB) => (findUserByEmailDB) => (validEmployee) => {
  return pipe(
    TE.tryCatch(
      async () => {
        const employeeFound = await findUserByEmailDB(validEmployee.email)

        if (employeeFound) {
          throw new EntityAlreadyExistError('Oops! Este funcionário já existe')
        }

        return employeeFound
      },
      (err) => clientError(err as Error)
    ),
    TE.chain((_user) => TE.tryCatch(
      async () => {
        const { name, email, businessAdminId } = validEmployee
        const hash = await hashPassword(businessAdminId as unknown as Password)

        return { name, email, businessAdminId, hash }
      },

      (err) => {
        console.log(err)
        return fail(new PasswordHashError('Oops! A sua senha não foi criada. Por favor contacte suporte'))
      }
    )),
    TE.chain(employee => TE.tryCatch(
      async () => await createEmployeeDB(employee),
      err => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    )),
    TE.chain(employee => TE.tryCatch(
      async () => {
        if (!employee) {
          throw new EntityNotFoundError('Oops! Por favor dê-nos informações da sua empresa')
        }

        return employee
      },
      err => clientError(err as Error)
    ))
  )
}
