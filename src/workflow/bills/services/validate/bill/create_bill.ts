import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { ICreataBillValidator } from '@bills/domain/Contracts'
import { ICreateBillPropsCodec } from '@bills/domain/requiredFields/bills/create_bill'

export const createBillValidate: ICreataBillValidator = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Oops! Dados de faturação em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      ICreateBillPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
