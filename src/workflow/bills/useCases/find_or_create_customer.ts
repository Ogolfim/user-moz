import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { findOrCreateCustomerValidate } from '@bills/services/validate/customer/find_or_create_customer'
import { findOrCreateCustomer } from '@bills/services/customer/create_customer'
import { findOrCreateCustomerDB } from '@bills/domain/entities/customer/find_or_create_customer'

export const findOrCreateCustomerUseCase: Middleware = (_httpRequest, httpBody) => {
  const { name, email, phone, accountType, address, userId } = httpBody

  const customer = { name, email, phone, accountType, address, userId }

  const httpResponse = pipe(
    customer,
    findOrCreateCustomerValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validCustomer => pipe(
      validCustomer,
      findOrCreateCustomer(findOrCreateCustomerDB),
      TE.map(customer => {
        return ok(customer)
      })
    ))
  )

  return httpResponse
}
