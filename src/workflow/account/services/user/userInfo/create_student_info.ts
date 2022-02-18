import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, fail } from '@core/infra/http_error_response'
import { DatabaseFailError, EntityAlreadyExistError } from '@account/domain/entities/errors/db_error'
import { CreateStudentInfoService } from '@account/domain/contracts/User/UserInfo/CreateStudentInfo'

export const createStudentInfoService: CreateStudentInfoService = (createStudentInfoDB) => (getStudentInfoByUserIdDB) => (student) => {
  const { userId } = student

  return pipe(
    TE.tryCatch(
      async () => await getStudentInfoByUserIdDB(userId),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(studentInfo => {
      return TE.tryCatch(
        async () => {
          if (studentInfo) {
            throw new EntityAlreadyExistError('Você já tem informações salvas. Podem ser atualizadas')
          }

          return studentInfo
        },

        err => clientError(err as Error)
      )
    }),
    TE.chain((_companyInfo) => TE.tryCatch(
      async () => await createStudentInfoDB(student),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
