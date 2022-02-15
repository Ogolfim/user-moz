import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { CustomerSchema } from '@bills/infra/prisma/schemas'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@bills/services/validate/errors/validation_error'
import { IFindOrCreateCustomer } from '@bills/domain/requiredFields/customers/create_customer'

interface UnValidatedCustomer {
  name: string
  email: string
  phone: string
  accountType: string
  userId: string
  address: {
    country: string
    provinceOrState: string
    city: string
    address1: string
    address2: string
    postcode: string
  }
}

export type IFindOrCreateCustomerValidator = (data: UnValidatedCustomer) => E.Either<ValidationError, IFindOrCreateCustomer>

export type FindOrCreateCustomerDB = (customer: IFindOrCreateCustomer) => Promise<CustomerSchema>

export type FindOrCreateCustomer = (findOrCreateCustomerDB: FindOrCreateCustomerDB) =>
(customer: IFindOrCreateCustomer) => TE.TaskEither<HttpErrorResponse, CustomerSchema>
