import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { fail } from '@core/infra/http_error_response'
import { DatabaseFailError } from '@account/domain/entities/errors/db_error'
import { CreateStudentInfoService } from '@account/domain/contracts/User/UserInfo/CreateStudentInfo'

export const createStudentInfoService: CreateStudentInfoService = (createStudentInfoDB) => (student) => {
  return pipe(
    TE.tryCatch(
      async () => await createStudentInfoDB(student),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    )
  )
}
