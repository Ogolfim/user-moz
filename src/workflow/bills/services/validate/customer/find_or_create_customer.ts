import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { ICreateCustomerCodec } from '@bills/domain/requiredFields/customers/create_customer'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { IFindOrCreateCustomerValidator } from '@bills/domain/Contracts/Customer/FindOrCreateCustomer'

export const findOrCreateCustomerValidate: IFindOrCreateCustomerValidator = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Dados em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      ICreateCustomerCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
