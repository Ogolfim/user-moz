import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { CreateBill } from '@bills/domain/Contracts/Bill/CreateBill'

export const findOrCreateCustomer: CreateBill = (validCustomer) => (findOrCreateCustomerDB) => {
  return TE.tryCatch(
    () => findOrCreateCustomerDB(validCustomer),
    err => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
