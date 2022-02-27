import * as TE from 'fp-ts/TaskEither'
import { CreateBillPaymentService } from '@bills/domain/Contracts/Payment/CreateBillPayment'
import { fail } from '@core/infra/http_error_response'

export const createBillPaymentService: CreateBillPaymentService = (createBillPaymentDB) => (bill) => {
  return TE.tryCatch(
    async () => await createBillPaymentDB(bill),
    err => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
}
