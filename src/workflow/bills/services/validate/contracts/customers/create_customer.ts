import * as E from 'fp-ts/lib/Either'
import { ICreateCustomer } from '@bills/domain/requiredFields/customers/create_customer'
import { ValidationError } from '@account/services/validate/errors/validation_error'
interface Address {
  country: string
  provinceOrState: string
  city: string
  address1: string
  address2: string
  postcode: string
}

interface IValidateCustomer {
  name: string
  email: string
  phone: string
  accountType: string
  address: Address
  userId: string
}

export type ICreateCustomerValidate = (data: IValidateCustomer) =>
E.Either<ValidationError, ICreateCustomer>
