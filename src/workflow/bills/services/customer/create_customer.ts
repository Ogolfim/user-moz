import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { FindOrCreateCustomer } from '@bills/domain/Contracts/Customer/FindOrCreateCustomer'

export const findOrCreateCustomer: FindOrCreateCustomer = (validCustomer) => (findOrCreateCustomerDB) => {
  return TE.tryCatch(
    () => findOrCreateCustomerDB(validCustomer),
    err => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
