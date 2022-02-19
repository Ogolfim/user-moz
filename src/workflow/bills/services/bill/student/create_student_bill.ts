import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { CreateStudentBillService } from '@bills/domain/Contracts/Student/CreateStudentBill'

export const createStudentBillService: CreateStudentBillService = (createStudentBillDB) => (validBill) => {
  return TE.tryCatch(
    async () => await createStudentBillDB(validBill),
    err => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
