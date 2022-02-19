import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { CreateUnipersonalBillService } from '@bills/domain/Contracts/Unipersonal/CreateUnipersonalBill'

export const createUnipersonalBillService: CreateUnipersonalBillService = (createUnipersonalBillDB) => (validBill) => {
  return TE.tryCatch(
    async () => await createUnipersonalBillDB(validBill),
    err => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
