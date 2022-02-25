import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { CreateStudentBillService } from '@bills/domain/Contracts/Student/CreateStudentBill'
import { UUID } from 'io-ts-types'
import { DatabaseFailError, EntityNotFoundError } from '@bills/domain/entities/errors/db_error'
import { pipe } from 'fp-ts/lib/function'

export const createStudentBillService: CreateStudentBillService = (createStudentBillDB) => (findStudentByUserIdDB) => (validBill) => {
  return pipe(
    TE.tryCatch(
      async () => await findStudentByUserIdDB(validBill.userId),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(student => {
      return TE.tryCatch(
        async () => {
          if (!student) {
            throw new EntityNotFoundError('Oops! A sua conta não foi encontrada')
          }

          return student
        },

        err => clientError(err as Error)
      )
    }),
    TE.chain(student => {
      const IBill = {
        ...validBill,
        studentId: student.id as UUID
      }

      return TE.tryCatch(
        async () => await createStudentBillDB(IBill),
        err => {
          console.log(err)
          return fail(new Error('Oops! Erro. Por favor contacte suporte'))
        }
      )
    })
  )
}
