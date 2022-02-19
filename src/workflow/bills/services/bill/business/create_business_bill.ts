import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { CreateBusinessBillService } from '@bills/domain/Contracts/Business/CreateBusinessBill'

export const createBusinessBillService: CreateBusinessBillService = (createBusinessBillDB) => (validBill) => {
  return TE.tryCatch(
    async () => await createBusinessBillDB(validBill),
    err => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
